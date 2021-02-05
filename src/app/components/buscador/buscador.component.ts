import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'

@Component({
  selector: 'codice-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  @Output() termino = new EventEmitter<string>()
  _termino: string
  @Output('escucharCarga') escuchaDeEstadoDeCarga = new EventEmitter<
    BehaviorSubject<boolean>
  >()

  estaCargando = new BehaviorSubject<boolean>(false)

  private _cargando = false
  public get cargando() {
    return this._cargando
  }

  id = Math.round(Math.random()*100000)

  public set cargando(value) {
    // Cuando se pone en true y término está vacio, ponemos un contador.
    // Si el contador llega al tiempo definido, quiere
    // decir que la carga fallo por alguna razón ajena
    // a este componente.

    this.setearContador(value, this._termino)

    this._cargando = value
  }

  input = new FormControl()

  constructor() {}

  ngOnInit(): void {
    this.registrarInput()

    this.escuchaDeEstadoDeCarga.emit(this.estaCargando)
    // Escuchamos por los cambios fuera de este componente.
    this.estaCargando.subscribe(valor => {
      this.cargando = valor
    })
  }

  registrarInput() {
    this.input.valueChanges
      .pipe(
        tap(_ => {
          this.cargando = true
          this.estaCargando.next(true)
        }),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((termino: string) => {
        let terminoLimpio = this.limpiarTermino(termino)

        // Asignamos de nuevo el termino limpio.
        this.input.patchValue(terminoLimpio, {
          emitEvent: false
        })
        this._termino = termino
        this.termino.emit(encodeURIComponent(termino))
      })
  }

  limpiarTermino(termino: string) {
    let limpio = termino.trim()
    return limpio
  }

  intervalo: number
  setearContador(estaCargando: boolean, termino: string) {
    if (estaCargando && termino === '') {
      if (!this.intervalo) {
        this.intervalo = setTimeout(() => {
          this.estaCargando.next(false)
        }, 3000)
      }
    }

    if (!estaCargando) {
      this.intervalo = null
      clearTimeout(this.intervalo)
      return
    }
  }
}
