import { Component, OnInit, Inject } from '@angular/core';
import { ModeloCompletoService } from '../../../services/modelo/modelo-completo.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { ModelosCompletosCrearModificarComponent } from './modelos-completos-crear-modificar.component';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-modelos-completos',
  templateUrl: './modelos-completos.component.html',
  styles: []
  ,providers: [{ provide: 'paginadorServiceModeloCompleto', useClass: PaginadorService },]

})
export class ModelosCompletosComponent extends Generales_GUI_CRUD< ModeloCompleto, ModeloCompletoService, ModelosCompletosCrearModificarComponent> implements OnInit {

  constructor(
    public _elementoService: ModeloCompletoService,
    @Inject('paginadorServiceModeloCompleto') public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      _elementoService, 
      _paginadorService,
       _msjService);
    
  }


  ngOnInit() {
  }

}