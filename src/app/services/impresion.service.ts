import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {
  constructor(private http: HttpClient) {}

  base = 'http://127.0.0.1:9090/'

  obtenerImpresoras() {
    return this.http.get<Impresora[]>(this.base.concat('impresoras-activas'))
  }

  imprimir(ticket: Ticket) {
    let opciones: Partial<OpcionesImpresion> = {
      imprimir: this.ticket(ticket),
      opciones: {
        impresora: 'OneNote for Windows 10',
        tamano_papel: {
          width: 78000,
          height: 100000
        }
      }
    }

    return this.http.post(this.base, opciones)
  }

  articulo = (datos: articulo) => ` <tr>
  <td class="columna_0">${datos.cantidad}</td>
  <td class="columna_1">${datos.producto}</td>
  <td class="columna_2">${datos.precio_unitario}</td>
  <td class="columna_3">${datos.importe}</td>
</tr>`

  ticket = (ticket: Ticket) =>
    `<!DOCTYPE html> <html><head> </head><body>  <style rel="stylesheet" type="text/css">  @page { size: 78mm 150mm;  }  body { font-family: "Courier New", "Lucida Console", monospace; width: 78mm; text-align: center;  }  h2 { width: 100%; margin: 0; padding: 0;  }  .lados { display: flex; justify-content: space-between;  }  hr,  table { width: 100%; font-size: 10px;  }  tr,  th,  td { border-bottom: solid; border-color: #ccc; border-width: 1px;  }  .columna_1 { text-align: left;  }  .columna_2:before,  .columna_3:before { content: "$ ";  }  .columna_2,  .columna_3 { white-space: nowrap; text-align: right;  }  #total { width: 100%;  }  #total span:first-child { width: 100%;  }  #footer { font-size: 10px;  }  </style>  <h2>${
      ticket.nombre_empresa
    }</h2>  <div class="lados">  <span> ${ticket.consecutivo} </span><span> ${
      ticket.create_at
    } </span>  </div>  <div class="lados"><span> Cajero: </span><span> ${
      ticket.usuario
    } </span></div>  <table>  <thead> <tr><th>CANT</th><th>PROD</th><th>P. UNI</th><th>IMPORTE</th> </tr>  </thead>  <tbody>  ${ticket.articulos.map(
      x => this.articulo(x)
    )}  </tbody>  </table>  <div id="total" class="lados"><span>Total: $</span> <b>${
      ticket.total
    }</b></div>  <br />  <div id="total" class="lados">  <span>Efectivo: $</span> <b>${
      ticket.efectivo
    }</b>  </div>  <div id="total" class="lados"><span>Cambio: $</span> <b>${
      ticket.cambio
    }</b></div>  <hr />  <p id="footer">Conserva este ticket para devoluciones y aclaraciones</p></body> </html> `
}

export interface Ticket {
  nombre_empresa: string
  consecutivo: string
  create_at: string
  usuario: string
  articulos: articulo[]
  total: string
  efectivo: string
  cambio: string
}

export interface articulo {
  cantidad: number
  producto: string
  precio_unitario: string
  importe: string
}

interface Impresora {
  name: string
  displayName: string
  description: string
  status: number
  isDefault: boolean
  options: {
    'printer-location': string
    'printer-make-and-model': string
    system_driverinfo: string
  }
}

interface OpcionesImpresion {
  imprimir: string
  opciones: {
    impresora: string
    tamano_papel: {
      width: number
      height: number
    }
  }
}
