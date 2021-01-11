import { ElementRef, Injectable, Renderer2 } from '@angular/core'
import { CollapsableElementDirective } from './collapsable-element.directive'

@Injectable({
  providedIn: 'root'
})
export class CollapsableService {
  private objetos: { [campo: string]: CollapsableElementDirective } = {}

  constructor() {}

  /**
   *Registra los objetos. Estos se deben de registrar unicamente
   * desde la directiva.
   *
   * @param {string} id El id con el cual se identifica en el html el elemento
   * @param {CollapsableElementDirective} el El elemento en si.
   * @memberof CollapsableService
   */
  registrar(id: string, c: CollapsableElementDirective) {
    // No debe estar vacio
    // if (!id) throw 'El id no debe estar vacio'
    if (this.existeId(id)) throw `El id "${id}" ya esta registrado`
    this.objetos[id] = c
  }

  /**
   * Comprueba si el id existe en la lista de objetos.
   *
   * @param {string} id El id a buscar
   * @returns true o false dependiendo si encuentra coincidencia
   * @memberof CollapsableService
   */
  existeId(id: string) {
    return Object.keys(this.objetos).includes(id)
  }

  toggle(id: string) {
    if (!this.existeId(id)) throw `No existe el id "${id}"`
    let objeto = this.objetos[id]
    objeto.toggle()
    return objeto
  }
}
