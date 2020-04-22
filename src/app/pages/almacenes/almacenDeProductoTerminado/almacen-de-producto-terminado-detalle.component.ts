import { Component, OnInit } from '@angular/core'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { Lotes } from '../../../models/almacenProductoTerminado/lotes.model'
import { ModeloCompletoService } from '../../../services/modelo/modelo-completo.service'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-almacen-de-producto-terminado-detalle',
  templateUrl: './almacen-de-producto-terminado-detalle.component.html',
  styles: []
})
export class AlmacenDeProductoTerminadoDetalleComponent implements OnInit {
  cargando = {}
  keys = Object.keys
  modeloCompleto: ModeloCompleto = null

  verLotesSinExistencia: boolean = false

  detalleLote: Lotes
  produccionEnTransito = 0

  constructor(
    public modComSer: ModeloCompletoService,
    public location: Location,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargando['cargando'] = 'Obteniendo detalle de SKU'

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    this.modComSer.findById(id).subscribe(m => {
      this.modeloCompleto = m
      delete this.cargando['cargando']
      this.cargando['enProceso'] = 'Obteniendo material en transito'

      this.modComSer.obtenerProduccionEnTransito(id).subscribe(x => {
        this.produccionEnTransito = x
        delete this.cargando['enProceso']
      })
    })
  }

  mostrarDetalleLote(lote: Lotes) {
    this.detalleLote = lote
  }
}
