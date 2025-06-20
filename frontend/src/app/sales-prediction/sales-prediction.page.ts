import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sales-prediction',
  templateUrl: './sales-prediction.page.html',
  styleUrls: ['./sales-prediction.page.scss'],
})
export class SalesPredictionPage implements OnInit {
  @ViewChild('salesChart', { static: true }) salesChart!: ElementRef;

  chart: any;
  productoId: string = '';
  message: string = '';
  repuestoNombre: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.productoId = this.route.snapshot.paramMap.get('producto_id') || '';
    this.getSalesPredictionData();
  }

  getSalesPredictionData() {
    this.http.get(`http://localhost:8000/api/predict-sales/${this.productoId}`).subscribe(
      (data: any) => {
        const ventasReales = data.ventas_reales;
        const ventasPredichas = data.ventas_predichas;

        this.createChart(ventasReales, ventasPredichas);
        this.getRepuestoNombre(); // Obtenemos el nombre después de obtener los datos
      },
      (error) => {
        console.error('Error al obtener los datos de predicción:', error);
        this.message = 'Hubo un error al obtener los datos de predicción.';
      }
    );
  }

  getRepuestoNombre() {
    this.http.get(`http://localhost:8000/api/repuesto-nombre/${this.productoId}`).subscribe(
      (data: any) => {
        this.repuestoNombre = data.nombre;
      },
      (error) => {
        console.error('Error al obtener el nombre del repuesto', error);
        this.repuestoNombre = 'Nombre no encontrado';
      }
    );
  }

  createChart(ventasReales: number[], ventasPredichas: number[]) {
    this.chart = new Chart(this.salesChart.nativeElement, {
      type: 'line',
      data: {
        labels: ventasReales.map((_, index) => `Dato ${index + 1}`),
        datasets: [
          {
            label: 'Ventas Reales',
            data: ventasReales,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Ventas Predichas',
            data: ventasPredichas,
            borderColor: 'green',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Datos procesados',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Ventas',
            },
          },
        },
      },
    });

    this.calculatePurchaseDecision(ventasReales, ventasPredichas);
  }

  calculatePurchaseDecision(ventasReales: number[], ventasPredichas: number[]) {
    const totalRealSales = ventasReales.reduce((a, b) => a + b, 0);
    const totalPredictedSales = ventasPredichas.reduce((a, b) => a + b, 0);

    const threshold = 0.1; // 10% más de predicción para recomendar compra
    if (totalPredictedSales > totalRealSales * (1 + threshold)) {
      this.message = '✅ Se recomienda comprar este producto.';
    } else {
      this.message = '⚠️ No se recomienda comprar este producto.';
    }
  }
}
