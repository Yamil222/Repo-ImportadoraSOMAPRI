import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroRepuesto'
})
export class FiltroRepuestoPipe implements PipeTransform {
  transform(items: any[], texto: string): any[] {
    if (!items) return [];
    if (!texto) return items;

    texto = texto.toLowerCase();
    return items.filter(item =>
      item.repuesto.toLowerCase().includes(texto)
    );
  }
}
