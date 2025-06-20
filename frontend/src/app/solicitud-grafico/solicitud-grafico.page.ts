import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-grafico',
  templateUrl: './solicitud-grafico.page.html',
  styleUrls: ['./solicitud-grafico.page.scss'],
})
export class SolicitudGraficoPage {
  successMessage: string = '';
  filtroBusqueda: string = ''; 
  idRepuesto: number = 0;
  anio: number = 0;
  errorMessage: string = '';
  years: number[] = [];
  dataProcessed: boolean = false;

  // Nueva variable para guardar el resumen
  resumenRepuestos: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.generateYears();
    this.cargarResumenRepuestos(); // Llama la función para cargar resumen al iniciar
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  submitForm() {
    this.errorMessage = '';
    this.successMessage = '';
    this.dataProcessed = false;

    if (!this.idRepuesto || !this.anio) {
      this.errorMessage = 'Por favor complete todos los campos antes de enviar.';
      return;
    }

    const data = { id_repuesto: this.idRepuesto, anio: this.anio };

    this.http.post('http://localhost:8000/api/llenar-test-reg', data).subscribe(
      (response: any) => {
        if (response.message) {
          this.dataProcessed = true;
          this.successMessage = response.message;

          setTimeout(() => {
            this.router.navigate([`/sales-prediction/${this.idRepuesto}`]);
          }, 5000);
        }
      },
      (error) => {
        console.error('Error al procesar los datos:', error);
        this.errorMessage = error.error.message || 'Hubo un error al procesar los datos. Intente de nuevo.';
      }
    );
  }

  // Nueva función para obtener resumen de repuestos desde backend
  cargarResumenRepuestos() {
    this.http.get<any[]>('http://localhost:8000/api/resumen-repuestos').subscribe(
      data => this.resumenRepuestos = data,
      error => console.error('Error al obtener resumen de repuestos', error)
    );
  }
  seleccionarRepuesto(id: number) {
    this.idRepuesto = id;
  }
}
