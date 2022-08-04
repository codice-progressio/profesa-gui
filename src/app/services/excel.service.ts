import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core'

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const EXCEL_EXTENSION = '.xlsx'

import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { Pedido } from '../models/pedido.model'
import { UsuarioService } from './usuario/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(
    private usuarioService: UsuarioService,
    private datePipe: DatePipe
  ) {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json)

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    }
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })
    this.saveAsExcelFile(excelBuffer, excelFileName)
  }

  generarNombre(fileName: string): string {
    let fecha = this.datePipe.transform(new Date(), 'yyyy_MM_dd_HH_mm')

    return `${fileName}_EXPORTADO_${fecha}${EXCEL_EXTENSION}`
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE })
    FileSaver.saveAs(data, this.generarNombre(fileName))
  }

  pedidoComoTextoPlanoFormateado(pedido: Pedido) {
    let wb = XLSX.utils.book_new()
    wb.Props = {
      Title: 'Pedido: ' + pedido.folio,
      Subject: pedido.contacto.nombre ?? pedido.contacto.razonSocial,
      Author: 'IMPERIUMsic',
      CreatedDate: new Date(pedido.createdAt)
    }

    wb.SheetNames.push('PEDIDO')

    let tamano_columnas = []

    let encabezados = [
      [
        'Folio:',
        pedido.folio,
        'Fecha:',
        this.datePipe.transform(
          new Date(pedido.createdAt),
          'dd/MMMM/yyyy HH:MM'
        )
      ],
      [
        'Cliente:',
        pedido.contacto.nombre ?? pedido.contacto.razonSocial,
        'RFC',
        pedido.contacto.rfc,
        'IVA:',
        pedido.contacto.listaDePrecios.iva
      ],
      [
        'Cod. Cliente:',
        pedido.contacto.codigo,
        'Domicilios',

        ...this.generarDomicilios(pedido.contacto.domicilios)
      ],
      [
        'Vendedor:',
        this.usuarioService.usuarioOffline.nombre,
        'Ubicacion:',
        pedido.ubicacion
          ? `https://google.com/maps?q=${pedido.ubicacion.latitud},${pedido.ubicacion.longitud}`
          : 'SIN UBICACION'
      ],
      [
        'Lista de precios:',
        pedido.contacto.listaDePrecios.nombre,
        'Observaciones',
        pedido.observaciones
      ]
    ]

    let aplanado = pedido.articulos
      .map(x => {
        return {
          ...x.sku,
          ...x
        }
      })
      .map(x => {
        let objetoOrdenado = {}
        ;[
          'cantidad',
          // 'unidad',
          'codigo',
          'nombreCompleto',
          // 'descripcion',
          'observaciones',
          'precio',
          'importe'
        ].forEach(a => (objetoOrdenado[a] = x[a]))
        return objetoOrdenado
      })

    let ultimaFila = ws => {
      let range = XLSX.utils.decode_range(ws['!ref'])
      return range.e.r - range.s.r + 1
    }

    let opciones = w => ({
      origin: ultimaFila(w)
    })

    let articulos_encabezados = [[...Object.keys(aplanado[0])]]
    let articulos_items = [...aplanado.map(x => Object.values(x))]

    let espacios = new Array(articulos_encabezados[0].length - 2).map(
      x => ' XX '
    )

    let totales = [
      [...espacios, 'IMPORTE: ', pedido.importe],
      [...espacios, 'IVA: ', pedido.iva],
      [...espacios, 'TOTAL: ', pedido.total]
    ]

    //Parseo de columnas
    // Numeros a texto

    let parsear = columnas => {
      return columnas.map((columna, i) => {
        let c = columna
        // Si c es un numero lo convierto a texto
        if (typeof c === 'number') c = c.toString()
        // Si c es no es un texto despues de comprobar que es un numero
        // entonces lo hacemos vacio ( quitamos null, undefined, etc)
        if (typeof c !== 'string') c = ''
        // Quitamos espacios en blanco
        c = c?.trim()
        return c
      })
    }

    encabezados = encabezados.map(parsear)
    articulos_encabezados = articulos_encabezados.map(parsear)
    articulos_items = articulos_items.map(parsear)
    totales = totales.map(parsear)

    // Analisis de columnas

    let analizar_tamano_de_columnas = (tamanos, columnas) => {
      columnas.forEach((columna, i) => {
        // Creamos un nuevo valor

        if (!tamanos[i]) tamanos[i] = 0

        let tam_max_columna = tamanos[i]
        let tamano_analizado = columna ? columna.length : 0
        if (tamano_analizado > tam_max_columna) tamanos[i] = tamano_analizado
      })
    }

    let analisis = columnas =>
      analizar_tamano_de_columnas(tamano_columnas, columnas)

    encabezados.forEach(analisis)
    articulos_encabezados.forEach(analisis)
    articulos_items.forEach(analisis)
    totales.forEach(analisis)

    // Crear arreglos faltantes para columnas

    let columnas_faltantes = columnas => {
      let columnas_actuales = columnas.length
      let columnas_diferencia = tamano_columnas.length - columnas_actuales
      if (columnas_diferencia > 0) {
        return [...columnas, ...new Array(columnas_diferencia).fill('')]
      }
      return columnas
    }

    encabezados = encabezados.map(columnas_faltantes)
    articulos_encabezados = articulos_encabezados.map(columnas_faltantes)
    articulos_items = articulos_items.map(columnas_faltantes)
    totales = totales.map(columnas_faltantes)


    //Compensacion de columnas

    let compensar_columnas = (tamanos, columnas) => {
      return columnas.map((columna, i) => {
        let tamano = tamanos[i]
        let nueva_columna = columna.padEnd(tamano, ' ')
        return nueva_columna
      })
    }

    let compensar = columnas => compensar_columnas(tamano_columnas, columnas)

    encabezados = encabezados.map(compensar)
    articulos_encabezados = articulos_encabezados.map(compensar)
    articulos_items = articulos_items.map(compensar)
    totales = totales.map(compensar)

    // Crear espacios
    let crear_espacios = () => {
      return [new Array(tamano_columnas.length)
        .fill('-')
        .map((c, i) => new Array(tamano_columnas[i]).fill('-').join(''))]
    }



    let worksheet = XLSX.utils.aoa_to_sheet(encabezados)
    XLSX.utils.sheet_add_aoa(
      worksheet,
      articulos_encabezados,
      opciones(worksheet)
    )
    XLSX.utils.sheet_add_aoa(worksheet, crear_espacios(), opciones(worksheet))
    XLSX.utils.sheet_add_aoa(worksheet, articulos_items, opciones(worksheet))
    XLSX.utils.sheet_add_aoa(worksheet, crear_espacios(), opciones(worksheet))
    XLSX.utils.sheet_add_aoa(worksheet, totales, opciones(worksheet))

    wb.Sheets.PEDIDO = worksheet
    let texto = XLSX.utils.sheet_to_html(worksheet, {
      // forceQuotes: false,
      // FS: '|'
    })

    let navigator = window.navigator as any
    const file = new File([texto], pedido.folio.concat('.html'), {
      type: 'text/html'
    })

    return new Promise((resolve, reject) => {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            text: pedido.observaciones ?? '',
            title: `Pedido con folio #${pedido.folio} del cliente ${
              pedido.contacto.nombre ?? pedido.contacto.razonSocial
            }`
          })
          .then(() => resolve(''))
          .catch((e: any) => reject(e))
      } else reject('No se puede compartir')
    })
  }

  generarDomicilios(
    domicilios: import('../models/contacto.model').ContactoDomicilio[]
  ): string[] {
    if (!domicilios) return []
    return domicilios.map(x => {
      return [
        x.calle,
        x.numeroExterior,
        x.numeroInterior,
        x.colonia,
        x.ciudad,
        x.estado
      ].join(' ')
    })
  }
}
