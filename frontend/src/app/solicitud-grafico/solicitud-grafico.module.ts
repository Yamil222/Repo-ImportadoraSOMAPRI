import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudGraficoPageRoutingModule } from './solicitud-grafico-routing.module';

import { SolicitudGraficoPage } from './solicitud-grafico.page';

// Importa el pipe aquí
import { FiltroRepuestoPipe } from '../filtro-repuesto.pipe'; // Ajusta la ruta si tu pipe está en otro lado

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudGraficoPageRoutingModule
  ],
  declarations: [
    SolicitudGraficoPage,
    FiltroRepuestoPipe  // Declara el pipe aquí
  ]
})
export class SolicitudGraficoPageModule {}
