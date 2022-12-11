import { EstadisticaRecargarComponent } from "./estadistica-recargar.component";

export class EstadisticaCarga {
  private _componenteCarga: EstadisticaRecargarComponent;
    public get componenteCarga(): EstadisticaRecargarComponent
    {
        return this._componenteCarga;
    }
    public set componenteCarga(value: EstadisticaRecargarComponent)
    {
        this._componenteCarga = value;
        this.cargar();
    }

    public cargar (){
        throw "Override this method";
    }
}