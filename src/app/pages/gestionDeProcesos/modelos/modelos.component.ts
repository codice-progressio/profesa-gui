import { Component,  OnInit, Inject } from '@angular/core';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { Modelo } from 'src/app/models/modelo.models';
import { ModeloService, ManejoDeMensajesService } from 'src/app/services/service.index';
import { ModelosCrearModificarComponent } from './modelos-crear-modificar.component';
import { constructor } from 'sizzle';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: [],
  providers: [{ provide: 'paginadorServiceModelos', useClass: PaginadorService },]
})
export class ModelosComponent extends Generales_GUI_CRUD< Modelo, ModeloService, ModelosCrearModificarComponent>  implements OnInit {

  constructor(
    public _maquinaService: ModeloService,
    @Inject('paginadorServiceModelos') public _paginadorService: PaginadorService,
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
