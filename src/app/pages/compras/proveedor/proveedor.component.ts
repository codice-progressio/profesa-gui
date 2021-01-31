import { Component, OnInit } from '@angular/core'
import { Proveedor } from 'src/app/models/proveedor.model'
import { ProveedorService } from 'src/app/services/proveedor.service'

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = []
  estaCargandoBuscador = false
  termino: string
  cargando = false

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.cargar()
  }

  obtenerPrimerContacto(proveedor: Proveedor) {
    return proveedor?.contactos?.[0]
  }

  cargar() {
    this.cargando = true
    this.proveedorService.leerTodo().subscribe(proveedores => {
      this.proveedores = proveedores
      this.cargando = false
    })
  }
}
