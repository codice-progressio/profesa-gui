import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModalService } from '@codice-progressio/modal'

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent implements OnInit {
  mostrarModal = false

  @Output() esteComponente = new EventEmitter<ModalWrapperComponent>()
  @Output() cerrado = new EventEmitter<void>()
  idModal = 'modal-wrapper-' + Math.random().toString(36).substring(7)

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.esteComponente.emit(this)
  }

  abrirModal(callback?: () => void) {
    this.mostrarModal = true
    // Necesitamos esperar a que se cree el componente para
    // que se registre. Esto lleva un pequeño
    // retraso al usar ng-container
    setTimeout(() => {
      this.modalService.open(this.idModal)
      if (callback) callback()
    }, 100)
  }

  modalCerrado() {
    this.mostrarModal = false
    setTimeout(() => {
      this.cerrado.emit()
    }, 100)
  }
}
