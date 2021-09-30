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
  constructor(private usuarioService: UsuarioService) {}

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
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE })
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    )
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
        'rfc',
        pedido.contacto.rfc,
        'Lista de precios:',
        pedido.contacto.listaDePrecios.nombre,
        'IVA:',
        pedido.contacto.listaDePrecios.iva
      ],
      ['Vendedor:', this.usuarioService.usuario.nombre],
      ['Primer dato', 'Segundo dato']
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

    let excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array'
    })
    this.saveAsExcelFile(excelBuffer, pedido.folio)
  }
}
