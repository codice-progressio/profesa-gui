import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden.models';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { UsuarioService, FolioService } from 'src/app/services/service.index';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';

@Component({
  selector: 'app-control-de-produccion',
  templateUrl: './control-de-produccion.component.html',
  styles: []
})
export class ControlDeProduccionComponent implements OnInit {
  
  // =========================================
  private NOMBRE_DEPTO: string = 'CONTROL DE PRODUCCIÓN';
  // =========================================
  orden: Orden = null;
  modeloCompleto: ModeloCompleto = new ModeloCompleto();
  linea: FolioLinea = new FolioLinea();

  constructor(
    public _usuarioService: UsuarioService,
    public _folioService: FolioService,
    public _listaDeOrdenesService: ListaDeOrdenesService

  ) {
    this.cargarOrdenesDeDepartamento();
  }
  

  ngOnInit() {
  }

  cargarOrdenesDeDepartamento( ) {
    // this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.controlDeProduccion();
  }

  recivirYEntregar() {
    
    this._folioService.controlDeProduccion_RecivirYEntregar(this._listaDeOrdenesService.obtenerTodasLasOrdenesDeEsteDepartamentoEnArrayYSoloId()).subscribe(
      resp => {
        this.cargarOrdenesDeDepartamento();
      }
    );

  }




}
