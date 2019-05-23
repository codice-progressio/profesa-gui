import { Injectable } from '@angular/core';
import { OrganizadorDragAndDrop } from './models/organizador-drag-and-drop.model';
import { DndObject } from './models/dndObject.model';
import { Hijos } from './models/hijos.model';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizadorDragAndDropService <T>{
 
  
  
  
    /**
     * La lista de objetos que se desplegaran para generar los campos
     * de drag and drop. 
     * Este se organiza asi:
     * listaDeObjetos = {
     *  'identificador': OrganizadorDragAndDrop[]
     * }
     *
     * @memberof OrganizadorDragAndDropService
     */
    listaDeObjetos = {};

    /**
     *La lista de objetos guardada de manera temporal para poder intercambar
     entree tipos de lista si es necesario. 
     *
     * @memberof OrganizadorDragAndDropService
     */
    listaDeObjetosTemp = {}

  /**
   *Alamacena la lista de elementos que pueden ser arrastrados a
    las areas de organizacion.
    *
    * @type {DndObject<T>[]}
    * @memberof OrganizadorDragAndDropService
    */
  listaDeElementos: DndObject<T>[] = [];

  /**
   *Muestra el area de drop para nuevos elementos
   provenientes desde listaDeElmentos
   *
   * @type {boolean}
   * @memberof OrganizadorDragAndDropService
   */
  mostrarAreaDeArrastre: boolean = false;


  /**
   *La leyenda del encabezado de la lista de elementos seleccionables.
   *
   * @type {string}
   * @memberof OrganizadorDragAndDropService
   */
  leyendaListaSeleccionable: string = 'Esta leyenda se puede personalizar.';


  constructor(
    private _msjService: ManejoDeMensajesService
  ) { 
  }

  /**
   * Crea una nueva area dnd. 
   *
   * @param {string} id El identificador del area que servira para recuperar los datos.
   * @returns {OrganizadorDragAndDrop<T>} Retorna la instancia para agregar padres e hijos con notacion de punto.
   * @memberof OrganizadorDragAndDropService
   */
  nuevaArea(id:string):OrganizadorDragAndDrop<T>{
    let dnd:OrganizadorDragAndDrop<T> = new OrganizadorDragAndDrop();
    this.listaDeObjetos[id] = dnd;
    return dnd;
  }

  /**
   * Anade un nuevo elemento a la lista de elementos seleccionables. 
   *
   * @returns {DndObject<T>}
   * @memberof OrganizadorDragAndDropService
   */
  addElemento( ): DndObject<T>{
    let d:DndObject<T> = new DndObject()
    this.listaDeElementos.push(d);
    return d;
  }


  /**
   *Limpia el organizador completamente.
   *
   * @memberof OrganizadorDragAndDropService
   */
  limpiar(){
    this.listaDeObjetos = {};
    this.listaDeObjetosTemp = {};
    this.mostrarAreaDeArrastre = false;
    this.listaDeElementos = [];

  };
  
  /**
   *Elimina los valores de la listaDeElementos.
   *
   * @memberof OrganizadorDragAndDropService
   */
  limpiarListaDeElementos() {
    this.listaDeElementos = [];
  }




  /**
   * Retorna las llaves en un arreglo para 
   * poder itinerar sobre el y crear los
   * diferentes objetos padres.
   *
   * @returns {string[]}
   * @memberof OrganizadorDragAndDropService
   */
  keys( ): string[]{
    return Object.keys(this.listaDeObjetos)
  }

  /**
   *Este evento se ejecuta cuando un nuevo elemento es arrastado
   desde la lista disponible hacia los elementos.
   *
   * @param {*} e El evento que contiene la data.
   * @param {string} key La llave del objeto que contiene el arreglo donde se agregara el dato.
   * @memberof OrganizadorDragAndDropService
   */
  drop( d:any[] ){

    let paraCopiar:DndObject<T> = <DndObject<T>>d[0].dragData;
    let datos:DndObject<T> = new DndObject();

    //copiamos los datos para obtener diferentes objectos cada vez. 
    datos.dnd = paraCopiar.dnd;
    datos.eliminable = paraCopiar.eliminable;
    datos.leyenda = paraCopiar.leyenda;
    datos.leyendaOptativa = paraCopiar.leyendaOptativa;
    datos.objeto = paraCopiar.objeto;
    datos.orden = paraCopiar.orden;

    let key: string = d[1];

    // Buscamos el elemento donde se va a guardar. 
      if (this.listaDeObjetos.hasOwnProperty(key)) {
        const area:OrganizadorDragAndDrop<T> = this.listaDeObjetos[key];
        area.hijos.ordenables.push(datos);
        this._msjService.informar('Se agrego el elemento.', 'Agregado', 2000);
        
    }

    this.actualizarPropiedadOrden();

  
  }

  /**
   *Muestra el area de arrastre cuando hay algun
   drag activo.
   *
   * @memberof OrganizadorDragAndDropService
   */
  dragStart(){
    this.mostrarAreaDeArrastre = true;
  }

  /**
   *Oculta el area de arrastre.
   *
   * @memberof OrganizadorDragAndDropService
   */
  dragStop(){
    this.mostrarAreaDeArrastre = false;
  }

  
  /**
   *Actualiza la propiedad orden de los elementos
   despues de un onDragSuccess
   *
   * @memberof OrganizadorDragAndDropService
   */
  actualizarPropiedadOrden(){

    for (const key in this.listaDeObjetos) {
      if (this.listaDeObjetos.hasOwnProperty(key)) {
        const element = this.listaDeObjetos[key];

        let o:number = element.padre.orden;
        let contador = 1;
        element.hijos.fijos.forEach((x:DndObject<T>) => {
          let decimal = o+'.'+contador;
          x.setOrden(decimal);
          contador++
        });
        element.hijos.ordenables.forEach((x:DndObject<T>) => {
          let decimal = o+'.'+contador;
          x.setOrden(decimal);
          contador++;
        });
        
      }
    }
    
}

/**
 *Retorna todos los objetos en un solo arreglo. 
 Si solo requieres los hijos ordenables ejecuta 
 obtenerObjetosDeHijosOrdenablesEnArreglo
 *
 * @returns {T[]}
 * @memberof OrganizadorDragAndDropService
 */
obtenerTodosLosObjetosEnUnSoloArreglo(): T[]{
  let a: T[] = [];

  for (const key in this.listaDeObjetos) {
    if (this.listaDeObjetos.hasOwnProperty(key)) {
      // Itineramos sobre cada elemento
      const element:OrganizadorDragAndDrop<T> = this.listaDeObjetos[key];
      // obtenemso los padres.
      a.push(element.padre.objeto);
      for (let i = 0; i < element.hijos.fijos.length; i++) {
        const hijoFijo = element.hijos.fijos[i];
        a.push(hijoFijo.objeto);
      } 
      for (let i = 0; i < element.hijos.ordenables.length; i++) {
        const hijoOrdenable = element.hijos.ordenables[i];
        a.push(hijoOrdenable.objeto);
      } 
    }
  }
  return a;
}

/**
 *Obtiene todos los hijos ordenables en un arreglo.
 *
 * @returns {T[]} El arreglo de hijos en el objeto deseado
 * @memberof OrganizadorDragAndDropService
 */
obtenerObjetosDeHijosOrdenablesEnArreglo():T[]{
  let a :T[] = [];

  for (const key in this.listaDeObjetos) {
    if (this.listaDeObjetos.hasOwnProperty(key)) {
      // Itineramos sobre cada elemento
      const element:OrganizadorDragAndDrop<T> = this.listaDeObjetos[key];

      element.hijos.ordenables.forEach((x:DndObject<T>) => {
        a.push(x.objeto);
      });
    }
  }
  return a;
}


/**
 *Obtiene los hijos ordenables en un solo arreglo y lo relaciona con el objeto padre. 
 *
 * @returns {DndObject<T>[]} El arreglo de todos los hijos ordenables. 
 * @memberof OrganizadorDragAndDropService
 */
obtenerHijosOrdenables():DndObject<T>[]{
  let a: DndObject<T>[] =[];
  for (const key in this.listaDeObjetos) {
    if (this.listaDeObjetos.hasOwnProperty(key)) {
      const objeto:OrganizadorDragAndDrop<T> = this.listaDeObjetos[key];
      objeto.hijos.ordenables.forEach(dnd => {
        dnd.objetoPadre = objeto.padre.objeto
        a.push(dnd);
      });
    }
  }
  return a;
}


/**
 * Devuelve el objeto padre si existe, si no tira un error. 
 * 
 * 
 * @param {string} idObjeto El id para obtener el padre.
 * @returns {OrganizadorDragAndDrop<T>}
 * @memberof OrganizadorDragAndDropService
 */
obtenerObjetoPadre( idObjeto: string ): OrganizadorDragAndDrop<T>{
  
  if( this.listaDeObjetos.hasOwnProperty(idObjeto)){
    return this.listaDeObjetos[idObjeto];
  }

  throw new Error("No existe la clave " + idObjeto);


}


/**
 *Elimina un hijo eliminable de la lista ordenable. 
 *
 * @param {number} i El indice del hijo
 * @param {string} key La llave donde buscar al hijo. 
 * @memberof OrganizadorDragAndDropService
 */
eliminarUnHijoEliminable( i: number, key: string ){
  this.listaDeObjetos[key].hijos.ordenables.splice(i, 1)
  this.actualizarPropiedadOrden();
}

/**
 *Busca si alguno de los hijos coincide con el datos que se le pase
 y con el campo. Normalmente se utiliza el id.
 *
 *
 * @param {string} dato
 * @param {string} [campo='_id']
 * @returns {boolean}
 * @memberof OrganizadorDragAndDropService
 */
existeObjectoPorCampo(dato: string, campo: string='_id'): boolean {
    //Recorremos todo 
    for (const key in this.listaDeObjetos) {
      if (this.listaDeObjetos.hasOwnProperty(key)) {
        const element:OrganizadorDragAndDrop<T> = this.listaDeObjetos[key];
        if( element.padre.objeto[campo] === dato ) return true;
        for (let i = 0; i < element.hijos.fijos.length; i++) {
          const hijoFijo = element.hijos.fijos[i];
          if(hijoFijo.objeto[campo]===dato) return true;
        }
        for (let i = 0; i < element.hijos.ordenables.length; i++) {
          const hijoOrdenable = element.hijos.ordenables[i];
          if(hijoOrdenable.objeto[campo]===dato) return true;
        }
      }
    } 

    return false;
}

/**Anade un hijo en el ultimo padre, al final de la lista de objetos. Es un objeto movil. 
 *
 *
 * @returns {*}
 * @memberof OrganizadorDragAndDropService
 */
addHijoAlFinal( ): DndObject<T> {
  let l:string[] = Object.keys(this.listaDeObjetos);
  let ultimo: OrganizadorDragAndDrop<T> = this.listaDeObjetos[l.pop()];
  return ultimo.hijos.addOrdenable();

}


/**
 *Guarda los cambios de manera temporal si necesitamos cambiar entre tipos de 
 listas ordenables o datos almacenados.
 *
 * @memberof OrganizadorDragAndDropService
 */
guardarCambiosDeManeraTemporal() {

  let a = this.listaDeObjetos;
  let b = this.listaDeObjetosTemp;

  this.listaDeObjetos = b;
  this.listaDeObjetosTemp = a;

}

/**
 *Comprueba si listaDeElemen
 *
 * @returns {boolean}
 * @memberof OrganizadorDragAndDropService
 */
tieneAreas(): boolean {
  let contador = 0
  for (const key in this.listaDeObjetos) {
    contador++;
  }
  return contador>0;
}

/**
 *Ordena todos los hijos ordenables por su propiedad orden. 
 *
 * @returns {*}
 * @memberof OrganizadorDragAndDropService
 */
ordenarPorPropiedadOrden(): any {
  // Recorremos todos los objetos. 
  for (const key in this.listaDeObjetos) {
    if (this.listaDeObjetos.hasOwnProperty(key)) {
      const objeto:OrganizadorDragAndDrop<T> = this.listaDeObjetos[key];

      // Ordenamos los hijos 
      objeto.hijos.ordenables.sort( (a, b)=>{
        // ES NECESARIO SEPARAR EL DECIMAL DEL ENTERO PARA
        // ORDENAR LOS HIJOS. 

        // SI TENEMOS UN NUMERO 1.1 Y 1.2 ENTONCES TODO MARCHA BIEN.
        // EL PROBLEMA RESIDE EN LOS DECIMALES. TENEMOS QUE SEPARAR Y ORDENAR
        // PRIMERO POR EL ENTERO Y LUEGO POR EL DECIMAL.

        let entero_A   = a.orden.split('.')[0];
        let entero_B   = b.orden.split('.')[0];

        let decimal_A  =  a.orden.split('.')[1] ? a.orden.split('.')[1] :'0' ;
        let decimal_B  =  b.orden.split('.')[1] ? b.orden.split('.')[1] :'0' ;

        let x = Number(entero_A) - Number(entero_B);

        return x == 0 ? Number(decimal_A) - Number(decimal_B) : x;
      } );
    }
  }
}


}