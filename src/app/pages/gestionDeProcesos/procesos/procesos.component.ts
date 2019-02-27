import { Component, OnInit } from '@angular/core';
import { Proceso } from 'src/app/models/proceso.model';
import { ProcesoService, ManejoDeMensajesService } from 'src/app/services/service.index';
import { ProcesosCrearModificarComponent } from './procesos-crear-modificar.component';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: []
})
export class ProcesosComponent extends Generales_GUI_CRUD< Proceso, ProcesoService, ProcesosCrearModificarComponent> implements OnInit  {

  constructor(
    public _procesoService: ProcesoService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      _procesoService, 
      _paginadorService,
       _msjService);
    
  }

  ngOnInit() {
  }

}
