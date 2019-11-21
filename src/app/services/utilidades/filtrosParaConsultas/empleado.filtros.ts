import { FiltrosDeConsultas } from "./FiltrosDeConsultas"

export class EmpleadoFiltros<T> extends FiltrosDeConsultas<T> {
  constructor(
    public servicio: T,
    private _idChecador?: number,
    private _idNomina?: number,
    private _nombres: string = null,
    private _apellidos: string = null,
    private _fechaDeNacimiento?: Date,
    //0 - H, 1 - M
    private _sexo: 0 | 1 = null,
    private _curp?: string,
    private _rfc?: string,
    private _numeroDeCuenta?: string,
    private _numeroDeSeguridadSocial?: string,
    private _puestoActual?: string,
    //Relacionado a eventosRH. estatusLaboral.
    private _activo: 0 | 1 = 1
  ) {
    super()
  }

  public set_idChecador(value: number): EmpleadoFiltros<T> {
    this._idChecador = value
    return this
  }
  public set_idNomina(value: number): EmpleadoFiltros<T> {
    this._idNomina = value
    return this
  }
  public set_nombres(value: string = null): EmpleadoFiltros<T> {
    this._nombres = value
    return this
  }
  public set_apellidos(value: string = null): EmpleadoFiltros<T> {
    this._apellidos = value
    return this
  }
  public set_fechaDeNacimiento(value: Date): EmpleadoFiltros<T> {
    this._fechaDeNacimiento = value
    return this
  }
  //0 - H, 1 - M
  public set_sexo(value: boolean): EmpleadoFiltros<T> {
    this._sexo = value ? 1 : 0
    return this
  }
  public set_curp(value: string): EmpleadoFiltros<T> {
    this._curp = value
    return this
  }
  public set_rfc(value: string): EmpleadoFiltros<T> {
    this._rfc = value
    return this
  }
  public set_numeroDeCuenta(value: string): EmpleadoFiltros<T> {
    this._numeroDeCuenta = value
    return this
  }
  public set_numeroDeSeguridadSocial(value: string): EmpleadoFiltros<T> {
    this._numeroDeSeguridadSocial = value
    return this
  }
  public set_puestoActual(value: string): EmpleadoFiltros<T> {
    this._puestoActual = value
    return this
  }
  //Relacionado a eventosRH. estatusLaboral.
  public set_activo(value: boolean): EmpleadoFiltros<T> {
    this._activo = value ? 1 : 0
    return this
  }

  public get idChecador(): number {
    return this._idChecador
  }
  public get idNomina(): number {
    return this._idNomina
  }
  public get nombres(): string {
    return this._nombres
  }
  public get apellidos(): string {
    return this._apellidos
  }
  public get fechaDeNacimiento(): Date {
    return this._fechaDeNacimiento
  }
  public get sexo(): 0 | 1 {
    return this._sexo
  }
  public get curp(): string {
    return this._curp
  }
  public get rfc(): string {
    return this._rfc
  }
  public get numeroDeCuenta(): string {
    return this._numeroDeCuenta
  }
  public get numeroDeSeguridadSocial(): string {
    return this._numeroDeSeguridadSocial
  }
  public get puestoActual(): string {
    return this._puestoActual
  }
  public get activo(): 0 | 1 {
    return this._activo
  }
}
