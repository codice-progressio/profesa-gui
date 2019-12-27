import { CamposParaMostrarFiltrosGeneral } from "src/app/pages/utilidadesPages/camposParaMostrarFiltrosGeneral"

export class EmpleadoCamposParaMostrarEnFiltro extends CamposParaMostrarFiltrosGeneral {
  constructor(
    private _idChecador?: boolean,
    private _idNomina?: boolean,
    private _nombres?: boolean,
    private _apellidos?: boolean,
    private _fechaDeNacimiento?: boolean,
    private _sexo?: boolean,
    private _curp?: boolean,
    private _rfc?: boolean,
    private _numeroDeCuenta?: boolean,
    private _numeroDeSeguridadSocial?: boolean,
    private _fotografia?: boolean,
    private _sueldoActual?: boolean,
    private _puestoActual?: boolean,
    private _activo?: boolean,
  ) {
    super()
  }

  public setIdChecador(v: boolean): this {
    this._idChecador = v
    return this
  }

  public get idChecador(): boolean {
    return this._idChecador
  }
  public setIdNomina(v: boolean): this {
    this._idNomina = v
    return this
  }

  public get idNomina(): boolean {
    return this._idNomina
  }
  public setNombres(v: boolean): this {
    this._nombres = v
    return this
  }

  public get nombres(): boolean {
    return this._nombres
  }
  public setApellidos(v: boolean): this {
    this._apellidos = v
    return this
  }

  public get apellidos(): boolean {
    return this._apellidos
  }
  public setFechaDeNacimiento(v: boolean): this {
    this._fechaDeNacimiento = v
    return this
  }

  public get fechaDeNacimiento(): boolean {
    return this._fechaDeNacimiento
  }
  public setSexo(v: boolean): this {
    this._sexo = v
    return this
  }

  public get sexo(): boolean {
    return this._sexo
  }
  public setCurp(v: boolean): this {
    this._curp = v
    return this
  }

  public get curp(): boolean {
    return this._curp
  }
  public setRfc(v: boolean): this {
    this._rfc = v
    return this
  }

  public get rfc(): boolean {
    return this._rfc
  }
  public setNumeroDeCuenta(v: boolean): this {
    this._numeroDeCuenta = v
    return this
  }

  public get numeroDeCuenta(): boolean {
    return this._numeroDeCuenta
  }
  public setNumeroDeSeguridadSocial(v: boolean): this {
    this._numeroDeSeguridadSocial = v
    return this
  }

  public get numeroDeSeguridadSocial(): boolean {
    return this._numeroDeSeguridadSocial
  }
  public setFotografia(v: boolean): this {
    this._fotografia = v
    return this
  }

  public get fotografia(): boolean {
    return this._fotografia
  }
  public setSueldoActual(v: boolean): this {
    this._sueldoActual = v
    return this
  }

  public get sueldoActual(): boolean {
    return this._sueldoActual
  }
  public setPuestoActual(v: boolean): this {
    this._puestoActual = v
    return this
  }

  public get puestoActual(): boolean {
    return this._puestoActual
  }
  public setActivo(v: boolean): this {
    this._activo = v
    return this
  }

  public get activo(): boolean {
    return this._activo
  }
}
