import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Imagen } from '../models/Imagen'
import { EnvService } from './env.service'

@Injectable({
  providedIn: 'root'
})
export class FicheroService {
  usuario: FicheroUsuario
  constructor(public envService: EnvService, public http: HttpClient) {
    this.usuario = new FicheroUsuario(this)
  }
}

class FicheroUsuario {
  constructor(private root: FicheroService) {}

  agregarImagen(id: string, img: File) {
    let formData: FormData = new FormData()
    formData.append('img', img, img.name)
    formData.append('_id', id)

    return this.root.http.put<Imagen>(
      this.root.envService.URL_BASE('ficheros/usuario/imagen'),
      formData
    )
  }

  eliminarImagen(id: string) {
    return this.root.http.delete<null>('ficheros/usuario/imagen/' + id)
  }
}
