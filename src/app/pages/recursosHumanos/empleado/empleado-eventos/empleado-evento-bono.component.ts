import { Component, OnInit, Input } from '@angular/core'
import { Bono } from '../../../../models/recursosHumanos/empleados/eventos/bono.model'

@Component({
  selector: 'app-empleado-evento-bono',
  templateUrl: './empleado-evento-bono.component.html',
  styles: []
})
export class EmpleadoEventoBonoComponent implements OnInit {
  _bono: Bono = null

  mensaje: string
  cantidad: number
  @Input() fecha: Date

  @Input() set bono(bono: Bono) {
    this.definirDatos(bono)
    this._bono = bono
  }

  get bono(): Bono {
    return this._bono
  }

  constructor() {}

  ngOnInit() {}

  datos = {
    porAsistencia: {
      msj: 'por asistencia'
    },
    porPuntualidad: {
      msj: 'por puntualidad'
    },
    porProductividad: {
      msj: 'por productividad'
    },
    porResultados: {
      msj: 'por resultados'
    },
    ayudaEscolarEventual: {
      msj: 'ayuda escolar eventual'
    },
    otros: {
      msj: 'otros'
    }
  }

  definirDatos(bono: Bono) {
    Object.keys(bono).forEach(x => {
      if (this.datos.hasOwnProperty(x)) {
        if (bono[x] !== null) {
          if (x === 'otros') {
            this.mensaje = 'Bono especial: ' + bono.otros.motivo
            this.cantidad = bono.otros.cantidad
          } else {
            this.mensaje = 'Bono ' + this.datos[x].msj
            this.cantidad = bono[x]
          }
        }
      }
    })
  }
}
