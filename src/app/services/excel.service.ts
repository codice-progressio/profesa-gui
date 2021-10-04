import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core'

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
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

    return `${fileName}_EXPORTADO_${fecha}.${EXCEL_EXTENSION}`
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE })
    FileSaver.saveAs(data, this.generarNombre(fileName))
  }

  pedidoComoHojaDeExcel(pedido: Pedido) {
    let wb = XLSX.utils.book_new()
    wb.Props = {
      Title: 'Pedido: ' + pedido.folio,
      Subject: pedido.contacto.nombre ?? pedido.contacto.razonSocial,
      Author: 'IMPERIUMsic',
      CreatedDate: pedido.createdAt
    }

    wb.SheetNames.push('PEDIDO')

    let worksheet = XLSX.utils.aoa_to_sheet([
      [
        'Folio:',
        pedido.folio,
        'Fecha:',
        pedido.createdAt,
        'Ubicacion:',
        'PENDIENTE DE CREAR'
      ],
      [
        'Cliente:',
        pedido.contacto.nombre ?? pedido.contacto.razonSocial,
        'RFC',
        pedido.contacto.rfc,
        'Lista de precios:',
        pedido.contacto.listaDePrecios.nombre,
        'IVA:',
        pedido.contacto.listaDePrecios.iva
      ],
      ['Vendedor:', this.usuarioService.usuarioOffline.nombre],
      ['Observaciones', pedido.observaciones]
    ])

    let ultimaFila = ws => {
      let range = XLSX.utils.decode_range(worksheet['!ref'])
      return range.e.r - range.s.r + 1
    }

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
          'unidad',
          'codigo',
          'nombreCompleto',
          'descripcion',
          'observaciones',
          'precio',
          'importe'
        ].forEach(a => (objetoOrdenado[a] = x[a]))
        return objetoOrdenado
      })

    XLSX.utils.sheet_add_json(worksheet, aplanado, {
      origin: ultimaFila(worksheet)
    })

    let espacios = new Array(6).map(x => '')

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [...espacios, 'IMPORTE: ', pedido.importe],
        [...espacios, 'IVA: ', pedido.iva],
        [...espacios, 'TOTAL: ', pedido.total]
      ],
      {
        origin: ultimaFila(worksheet)
      }
    )

    wb.Sheets.PEDIDO = worksheet

    let data: any = XLSX.writeFile(wb, this.generarNombre(pedido.folio), {
      bookType: 'xlsx',
      type: 'array'
    })
    const navigator = window.navigator as any

    return new Promise((resolve, reject) => {
      if (navigator.canShare)
        navigator
          .share({
            files: [data],
            title: this.generarNombre(pedido.folio),
            text: pedido.folio
          })
          .then(result => resolve(result))
      else reject('No soportado por el dispositivo')
    })
  }
}
