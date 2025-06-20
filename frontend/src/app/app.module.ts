import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavComponent } from './components/nav/nav.component';
import { SlideMenuComponent } from './components/slide-menu/slide-menu.component';

import { FiltroRepuestoPipe } from './filtro-repuesto.pipe';



@NgModule({
  declarations: [AppComponent, NavComponent, SlideMenuComponent, FiltroRepuestoPipe],
  exports: [NavComponent],
  imports: [HttpClientModule,BrowserModule,CommonModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
