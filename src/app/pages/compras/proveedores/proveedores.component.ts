import { Component, OnInit } from '@angular/core'
import { Proveedor } from '../../../models/proveedor.model'
import { ProveedorService } from '../../../services/proveedor.service'

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
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
