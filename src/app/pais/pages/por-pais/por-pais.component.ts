import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html'
})

export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}
  
  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino)
    .subscribe({
      next: (respuesta) => {
        console.log(respuesta),
        this.paises = respuesta
      },
      error: (err) => {
        this.hayError = true,
        this.paises = []
      }
    });

    /** Deprecated **/
    /*
    this.paisService.buscarPais(this.termino)
    .subscribe((respuesta) => {
      console.log(respuesta);
    }, (err) => {
      this.hayError = true;
    });
    */
  }

  sugerencias(termino: string) {
    this.hayError = false;
    // To do: crear sugerencias
  }
}