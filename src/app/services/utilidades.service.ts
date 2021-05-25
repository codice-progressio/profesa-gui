import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, OnInit } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  fullScreen: FullScreen

  constructor() {
    this.fullScreen = new FullScreen(this)
  }

  niceUrl(str: string): string {
    return str
      .split(' ')
      .map(x => x.trim())
      .join('_')
  }
}

class FullScreen {
  constructor(private root: UtilidadesService) {}

  ocultarMarcoDeApp = false

  // Tomado de https://stackoverflow.com/a/51998854/4326551
  open(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen()
    }
  }

  /* Close fullscreen */
  close(document) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      /* Firefox */

      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */

      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen()
    }
  }

  sinDistracciones(document: Document) {
    this.ocultarMarcoDeApp = !this.ocultarMarcoDeApp
    if (this.ocultarMarcoDeApp) this.open(document.documentElement)
    else this.close(document)
  }
}
