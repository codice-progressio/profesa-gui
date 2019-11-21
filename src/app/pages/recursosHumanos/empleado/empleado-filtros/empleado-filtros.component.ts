import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { EmpleadoCamposParaMostrarEnFiltro } from "./empleado-campos-para-mostrar-en-filtro"
import { Puesto } from '../../../../models/recursosHumanos/puestos/puesto.model'
import { PuestoService } from '../../../../services/recursosHumanos/puesto.service'
import { Dato } from "src/app/shared/data-list/dato.model";
import { DataListComponent } from '../../../../shared/data-list/data-list.component'

@Component({
  selector: "app-empleado-filtros",
  templateUrl: "./empleado-filtros.component.html",
  styles: []
})
export class EmpleadoFiltrosComponent implements OnInit {
  @Output() obtenerFiltros = new EventEmitter<this>()

  seleccionarCamposVisibles = new EmpleadoCamposParaMostrarEnFiltro()

  public idChecador: number = null
  public idNomina: number = null
  public nombres: string = null
  public apellidos: string = null
  public fechaDeNacimiento: Date = null
  //0 - H, 1 - M
  public sexo: boolean = null
  public curp: string = null
  public rfc: string = null
  public numeroDeCuenta: string = null
  public numeroDeSeguridadSocial: string = null
  public fotografia: string = null
  public sueldoActual: number = null
  public puestoActual: Puesto = null
  //Relacionado a eventosRH. estatusLaboral.
  public activo: boolean = true
  //El puesto esta dentro de los eventos.



  puestoDataList: DataListComponent =  null

  constructor(
    private _puestoService: PuestoService
  ) {
    this.seleccionarCamposVisibles.mostrarTodo()
  }

  ngOnInit() {}

  ejecutarOperacionesdeBusquedaPuesto(pay) {
    if (!pay) return

    this._puestoService.buscar(pay.termino).subscribe((puestos) => {
      let dat: Dato[] = []
      puestos.forEach((art: Puesto) => {
        dat.push(this.crearDatoParaDataListPuesto(art))
      })

      pay.dataList.terminoBusqueda(dat)
    })
  }

  private crearDatoParaDataListPuesto(puesto: Puesto): Dato {
    let d = new Dato()
    d.leyendaPrincipal = puesto.puesto
    d.leyendaSecundaria = puesto.departamento.nombre
    d.descripcionPrincipal = puesto.misionDelPuesto
    d.descripcionSecundaria = 'No se que va a aqui'
    d.objeto = puesto
    return d
  }

  puestoSeleccionado( dato: Dato ) {
    this.puestoActual = dato ? <Puesto>  dato.objeto : null
  }

  limpiar() {
    this.idChecador = null
    this.idNomina = null
    this.nombres = null
    this.apellidos = null
    this.fechaDeNacimiento = null

    this.sexo = null
    this.curp = null
    this.rfc = null
    this.numeroDeCuenta = null
    this.numeroDeSeguridadSocial = null
    this.fotografia = null
    this.sueldoActual = null
    this.puestoActual = null
    this.activo = true


    this.puestoDataList.reiniciar()
    this.obtenerFiltros.emit(this)
  }

  filtrar() {
    this.obtenerFiltros.emit(this)
  }


  
}
