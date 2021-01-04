/**
 *Construye una query para pasar filtros por la url.
 *
 * @interface URLQuery
 */
export class URLQuery {
  /**
   *Desde donde se van a comenzar a extraer datos.
   *
   * @type {number}
   * @memberof Filtros
   */
  desde: number = 0
  /**
   *Cantidad maxima de datos a traer.
   *
   * @type {number}
   * @memberof Filtros
   */
  limite: number = 30
  /**
   *El campo por el cual se quieren ordenar los datos
   *
   * @type {string}
   * @memberof Filtros
   */
  campoSort: string = ''
  /**
   *Modo de ordenamiento de los datos
   *
   * @type {number}
   * @memberof Filtros
   */
  sort: -1 | 1 = 1

  /**
   *Tupla de tipo campo=valor
   *
   * @type {[string, string][]}
   * @memberof Filtros
   */
  query: [string, string][] = []

  /**
   *Agrega una nueva tupla de query
   *
   * @param {string} campo
   * @param {string} valor
   * @returns
   * @memberof URLQuery
   */
  add(campo: string, valor: string) {
    this.query.push([campo, valor])
    return this
  }

  /**
   *Obtiene el string de la query formada para adjuntarla a la url
   *
   * @returns
   * @memberof URLQuery
   */
  obtenerQuery() {
    return (
      '?' +
      [
        ['desde', this.desde],
        ['limite', this.limite],
        ['campoSort', this.campoSort],
        ['sort', this.sort]
      ]
        .concat(...this.query)
        .map(x => x.join('='))
        .join('&')
    )
  }
}
