import { Component, OnInit } from '@angular/core';
import { CrearModificar_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD';
import { Folio } from 'src/app/models/folio.models';
import { FolioNewService, ValidacionesService } from 'src/app/services/service.index';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-folios-crear-modificar',
  templateUrl: './folios-crear-modificar.component.html',
  styles: [],
  
})
export class FoliosCrearModificarComponent extends CrearModificar_GUI_CRUD<Folio, FolioNewService > implements OnInit {

  constructor(
    public _elementoService: FolioNewService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
  ) { 

    super( _elementoService,
      formBuilder,
      _validacionesService)
  }

  ngOnInit() {
  }

}
