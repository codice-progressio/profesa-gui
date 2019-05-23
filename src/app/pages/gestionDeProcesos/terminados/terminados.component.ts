import { Component, OnInit, Inject } from '@angular/core';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { Terminado } from 'src/app/models/terminado.models';
import { TerminadosCrearModificarComponent } from './terminados-crear-modificar.component';
import { TerminadoService } from 'src/app/services/modelo/terminado.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-terminados',
  templateUrl: './terminados.component.html',
  styles: []
  ,providers: [{ provide: 'paginadorServiceTerminados', useClass: PaginadorService },]
})
export class TerminadosComponent extends Generales_GUI_CRUD< Terminado, TerminadoService, TerminadosCrearModificarComponent> implements OnInit {

  constructor(
    public _maquinaService: TerminadoService,
    @Inject('paginadorServiceTerminados') public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      _maquinaService, 
      _paginadorService,
       _msjService);
    
  }


  ngOnInit() {
  }

}