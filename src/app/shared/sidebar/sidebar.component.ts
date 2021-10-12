import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
import { Usuario } from '../../models/usuario.model'
import { SidebarService } from 'src/app/services/shared/sidebar.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class SidebarComponent implements OnInit {
  usuario: Usuario

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public _sideBar: SidebarService,
    public _usuarioService: UsuarioService
  ) {}

  // Estos servicios los aplicamos directamente en el html.
  ngOnInit() {
    this.usuario = this._usuarioService.usuario
    this._sideBar.cargarMenu()
  }

  onClick(event) {
    if (this._sideBar.permitirOcultarMenu) {
      let modoMini = document.body.classList.contains('mini-sidebar')
      let seMuestra = document.body.classList.contains('show-sidebar')

      if (
        modoMini &&
        seMuestra &&
        !this.el.nativeElement.contains(event.target)
      )
        this.renderer.removeClass(document.body, 'show-sidebar')
    } else this._sideBar.permitirOcultarMenu = true
  }

  cerrarMenu() {
    this.renderer.removeClass(document.body, 'show-sidebar')
  }
}
