import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public URL_DOMINIO = environment.URL_DOMINIO
  public URL_SERVICIOS = environment.URL_SERVICIOS

  // Whether or not to enable debug mode
  public enableDebug = true
  public URL_BASE = path => `${this.URL_SERVICIOS}/${path}`

  constructor() {}
}
