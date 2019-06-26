import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';

@Component({
  selector: 'app-almacen-de-materia-prima-yherramientas',
  templateUrl: './almacen-de-materia-prima-yherramientas.component.html',
  styles: []
})
export class AlmacenDeMateriaPrimaYHerramientasComponent implements OnInit {


  articulos: Articulo[] = []
  buscando: boolean = false

  constructor() { }


  ngOnInit() {
    this.cargarArticulos()
  }


  cargarArticulos(){

  }


  buscar(termino: string) {
    if (termino.trim().length === 0) {
      this.cargarArticulos()
      this.buscando = false
      return
    }

    this.buscando = true
    // this._almacenDeProductoTerminadoService
    //   .search(termino, undefined, undefined, ModeloCompleto)
    //   .subscribe((mcs) => {
    //     mcs.map((mc) => {
    //       mc._servicio = this._modeloCompletoService
    //     })
    //     this.modelosCompletos = mcs
    //   })
  }

}
