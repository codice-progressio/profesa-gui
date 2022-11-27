import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { Pedido } from 'src/app/models/pedido.model'
import { ImpresionService } from 'src/app/services/impresion.service'
import { ContactoDomicilio } from 'src/app/models/contacto.model'
import { PedidoService } from 'src/app/services/pedido.service'

@Component({
  selector: 'app-impresion-pedido-nube',
  templateUrl: './impresion-pedido-nube.component.html',
  styleUrls: ['./impresion-pedido-nube.component.css']
})
export class ImpresionPedidoNubeComponent implements OnInit, AfterViewInit {
  pedido: Pedido | undefined = undefined

  constructor(
    private imprimirService: ImpresionService,
    private location: Location,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.pedido = this.imprimirService.pedidoNube
  }
  
  ngAfterViewInit(): void {
    print()
  }

  @HostListener('window:afterprint', [])
  onWindowAfterPrint() {
    this.location.back()
  }

  generarDomicilios(domicilios: ContactoDomicilio[]) {
    return this.pedidoService.helpers.generarDomicilios(domicilios)
  }

  generar_ubicacion(ubicacion: { latitud: number; longitud: number }) {
    return this.pedidoService.helpers.generarUbicacion(ubicacion)
  }
}
