import { Component, OnInit } from '@angular/core';
import { MaquinaService } from 'src/app/services/service.index';
import { Maquina } from 'src/app/models/maquina.model';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { MaquinasCrearModificarComponent } from './maquinas-crear-modificar.component';
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';


@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styles: []
})
export class MaquinasComponent extends Generales_GUI_CRUD< Maquina, MaquinaService, MaquinasCrearModificarComponent>  implements OnInit {

  constructor(
    public _maquinaService: MaquinaService,
    public _paginadorService: PaginadorService,
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
