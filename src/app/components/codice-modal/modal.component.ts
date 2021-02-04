import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core'

import { ModalService } from './modal.service'

@Component({
  selector: 'codice-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  // Tomado de https://jasonwatmore.com/post/2020/09/24/angular-10-custom-modal-window-dialog-box#:~:text=To%20make%20the%20modal%20component,imports%20array%20on%20line%2016%20.

  @Input() id: string = ''
  @Output() cerrado = new EventEmitter<null>()

  private element: any

  constructor(
    private renderer: Renderer2,
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('El modal debe tener un id')
      return
    }

    // // move element to bottom of page (just before </body>) so it can be displayed above everything else

    this.renderer.appendChild(document.body, this.element)
    // document.body.appendChild(this.element)

    // // close modal on background click
    this.renderer.listen(this.element, 'click', el => {
      if (el.target.className === 'codice-modal') {
        this.close()
      }
    })
    // this.element.addEventListener('click', el => {
    //   if (el.target.className === 'codice-modal') {
    //     this.close()
    //   }
    // })

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this)
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id)
    this.element.remove()
  }

  // open modal
  open(): void {
    this.element.style.display = 'block'
    document.body.classList.add('codice-modal-open')
  }

  // close modal
  close(): void {
    this.element.style.display = 'none'
    document.body.classList.remove('codice-modal-open')
    this.cerrado.next()
  }
}
