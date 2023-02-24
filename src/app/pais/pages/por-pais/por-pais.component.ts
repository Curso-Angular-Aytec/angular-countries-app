import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})

export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}
  
  buscar(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = false;
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
    console.log(termino);
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino)
    .subscribe({
      next: (paises) => {
        console.log(paises),
        this.paisesSugeridos = paises.splice(0,5)
      },
      error: (err) => {
        this.paisesSugeridos = []
      }
    });
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}