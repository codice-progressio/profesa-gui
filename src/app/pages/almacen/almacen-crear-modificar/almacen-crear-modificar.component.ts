import { Component, OnInit } from '@angular/core'
import { ValidacionesService } from '../../../services/utilidades/validaciones.service'
import { SkuService } from '../../../services/sku/sku.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { SKU } from '../../../models/sku.model'
import { FormControl, FormGroup, FormArray } from '@angular/forms'

@Component({
  selector: 'app-almacen-crear-modificar',
  templateUrl: './almacen-crear-modificar.component.html',
  styleUrls: ['./almacen-crear-modificar.component.css']
})
export class AlmacenCrearModificarComponent implements OnInit {
   ngOnInit(){}

}
