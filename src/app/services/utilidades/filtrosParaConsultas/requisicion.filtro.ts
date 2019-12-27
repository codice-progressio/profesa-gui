import { FiltrosDeConsultas } from "./FiltrosDeConsultas"
import { FiltrosFolio } from "./FiltrosFolio"
import { Usuario } from "src/app/models/usuario.model"
import { Articulo } from "../../../models/almacenDeMateriaPrimaYHerramientas/articulo.modelo"

export class RequisicionFiltros<T> extends FiltrosDeConsultas<T> {
  constructor(
    public servicio: T,
    private _folioDesde?: number,
    private _folioHasta?: number,
    private _usuario?: string,
    private _materiaPrima: 0 | 1 = 0,
    private _consumibles: 0 | 1 = 0,
    private _gastosYServicios: 0 | 1 = 0,
    private _articulo?: string,
    private _estatus_esRequisicion: 0 | 1 = 0,
    private _estatus_esOrdenDeCompra: 0 | 1 = 0,
    private _estatus_fechaDeGeneracionDeOrdenDeCompraDesde?: Date,
    private _estatus_fechaDeGeneracionDeOrdenDeCompraHasta?: Date,
    private _estatus_fechaTerminoYEntradaAlmacenDesde?: Date,
    private _estatus_fechaTerminoYEntradaAlmacenHasta?: Date,
    private _estatus_esEntregaParcial: 0 | 1 = 0,
    private _estatus_fechaEntregaParcialidadDesde?: Date,
    private _estatus_fechaEntregaParcialidadHasta?: Date,
    private _estatus_cantidadEntregadaALaFecha?: number,
    private _estatus_esTerminada: 0 | 1 = 0,
    private _estatus_fechaTerminadaDesde?: Date,
    private _estatus_fechaTerminadaHasta?: Date,
    private _estatus_esCancelada: 0 | 1 = 0,
    private _estatus_fechaCancelacionDesde?: Date,
    private _estatus_fechaCancelacionHasta?: Date
  ) {
    super()
  }


  public set_folioDesde(value: number): RequisicionFiltros<T> {
    this._folioDesde = value
    return this
  }

  public set_folioHasta(value: number): RequisicionFiltros<T> {
    this._folioHasta = value
    return this
  }

  public set_usuario(value: Usuario): RequisicionFiltros<T> {
    this._usuario = value ? value._id : null
    return this
  }

  public set_materiaPrima(value: boolean): RequisicionFiltros<T> {
    this._materiaPrima = value ? 1 : 0
    return this
  }

  public set_consumibles(value: boolean): RequisicionFiltros<T> {
    this._consumibles = value ? 1 : 0
    return this
  }

  public set_gastosYServicios(value: boolean): RequisicionFiltros<T> {
    this._gastosYServicios = value ? 1 : 0
    return this
  }

  public set_articulo(value: Articulo): RequisicionFiltros<T> {
    this._articulo = value ? value._id : null
    return this
  }

  public set_estatus_esRequisicion(value: boolean): RequisicionFiltros<T> {
    this._estatus_esRequisicion = value ? 1 : 0
    return this
  }

  public set_estatus_esOrdenDeCompra(value: boolean): RequisicionFiltros<T> {
    this._estatus_esOrdenDeCompra = value ? 1:0
    return this
  }

  public set_estatus_fechaDeGeneracionDeOrdenDeCompraDesde(
    value: Date
  ): RequisicionFiltros<T> {
    this._estatus_fechaDeGeneracionDeOrdenDeCompraDesde = value
    return this
  }

  public set_estatus_fechaDeGeneracionDeOrdenDeCompraHasta(
    value: Date
  ): RequisicionFiltros<T> {
    this._estatus_fechaDeGeneracionDeOrdenDeCompraHasta = value
    return this
  }

  public set_estatus_fechaTerminoYEntradaAlmacenDesde(
    value: Date
  ): RequisicionFiltros<T> {
    this._estatus_fechaTerminoYEntradaAlmacenDesde = value
    return this
  }

  public set_estatus_fechaTerminoYEntradaAlmacenHasta(
    value: Date
  ): RequisicionFiltros<T> {
    this._estatus_fechaTerminoYEntradaAlmacenHasta = value
    return this
  }

  public set_estatus_esEntregaParcial(value: boolean): RequisicionFiltros<T> {
    this._estatus_esEntregaParcial = value ? 1 : 0
    return this
  }

  public set_estatus_fechaEntregaParcialidadDesde(
    value: Date
  ): RequisicionFiltros<T> {
    this._estatus_fechaEntregaParcialidadDesde = value
    return this
  }
  public set_estatus_fechaEntregaParcialidadHasta(
    value: Date
  ): RequisicionFiltros<T> {
    this._estatus_fechaEntregaParcialidadHasta = value
    return this
  }

  public set_estatus_cantidadEntregadaALaFecha(
    value: number
  ): RequisicionFiltros<T> {
    this._estatus_cantidadEntregadaALaFecha = value
    return this
  }

  public set_estatus_esTerminada(value: boolean): RequisicionFiltros<T> {
    this._estatus_esTerminada = value ? 1 : 0
    return this
  }

  public set_estatus_fechaTerminadaDesde(value: Date): RequisicionFiltros<T> {
    this._estatus_fechaTerminadaDesde = value
    return this
  }
  public set_estatus_fechaTerminadaHasta(value: Date): RequisicionFiltros<T> {
    this._estatus_fechaTerminadaHasta = value
    return this
  }
  public set_estatus_esCancelada(value: boolean): RequisicionFiltros<T> {
    this._estatus_esCancelada = value ? 1 : 0
    return this
  }
  public set_estatus_fechaCancelacionDesde(value: Date): RequisicionFiltros<T> {
    this._estatus_fechaCancelacionDesde = value
    return this
  }
  public set_estatus_fechaCancelacionHasta(value: Date): RequisicionFiltros<T> {
    this._estatus_fechaCancelacionHasta = value
    return this
  }

  // GET!!!

    public get folioDesde(): number {
      return this._folioDesde
    }

    public get folioHasta(): number {
      return this._folioHasta
    }

    public get usuario(): string {
      return this._usuario
    }

    public get materiaPrima(): 0 | 1  {
      return this._materiaPrima
    }

    public get consumibles(): 0 | 1  {
      return this._consumibles
    }

    public get gastosYServicios(): 0 | 1  {
      return this._gastosYServicios
    }

    public get articulo(): string {
      return this._articulo
    }

    public get estatus_esRequisicion(): 0 | 1  {
      return this._estatus_esRequisicion
    }

    public get estatus_esOrdenDeCompra(): 0 | 1  {
      return this._estatus_esOrdenDeCompra
    }

    public get estatus_fechaDeGeneracionDeOrdenDeCompraDesde(): Date {
      return this._estatus_fechaDeGeneracionDeOrdenDeCompraDesde
    }

    public get estatus_fechaDeGeneracionDeOrdenDeCompraHasta(): Date {
      return this._estatus_fechaDeGeneracionDeOrdenDeCompraHasta
    }

    public get estatus_fechaTerminoYEntradaAlmacenDesde(): Date {
      return this._estatus_fechaTerminoYEntradaAlmacenDesde
    }

    public get estatus_fechaTerminoYEntradaAlmacenHasta(): Date {
      return this._estatus_fechaTerminoYEntradaAlmacenHasta
    }

    public get estatus_esEntregaParcial(): 0 | 1  {
      return this._estatus_esEntregaParcial
    }

    public get estatus_fechaEntregaParcialidadDesde(): Date {
      return this._estatus_fechaEntregaParcialidadDesde
    }

    public get estatus_fechaEntregaParcialidadHasta(): Date {
      return this._estatus_fechaEntregaParcialidadHasta
    }

    public get estatus_cantidadEntregadaALaFecha(): number {
      return this._estatus_cantidadEntregadaALaFecha
    }

    public get estatus_esTerminada(): 0 | 1  {
      return this._estatus_esTerminada
    }

    public get estatus_fechaTerminadaDesde(): Date {
      return this._estatus_fechaTerminadaDesde
    }

    public get estatus_fechaTerminadaHasta(): Date {
      return this._estatus_fechaTerminadaHasta
    }

    public get estatus_esCancelada(): 0 | 1  {
      return this._estatus_esCancelada
    }

    public get estatus_fechaCancelacionDesde(): Date {
      return this._estatus_fechaCancelacionDesde
    }

    public get estatus_fechaCancelacionHasta(): Date {
      return this._estatus_fechaCancelacionHasta
    }

}
