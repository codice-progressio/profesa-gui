import { Component, OnInit, Inject } from '@angular/core';
import { Color } from 'src/app/models/color.models';
import { ColorService } from '../../../services/modelo/color.service';
import { ColoresCrearModificarComponent } from './colores-crear-modificar.component';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { ManejoDeMensajesService } from 'src/app/services/service.index';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styles: []
  ,providers: [{ provide: 'paginadorServiceColores', useClass: PaginadorService },]

})
export class ColoresComponent extends Generales_GUI_CRUD< Color, ColorService, ColoresCrearModificarComponent> implements OnInit {

  constructor(
    public _maquinaService: ColorService,
    @Inject('paginadorServiceColores') public _paginadorService: PaginadorService,
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
