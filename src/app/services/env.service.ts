import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public URL_DOMINIO = ''
  public URL_SERVICIOS = ''

  // Whether or not to enable debug mode
  public enableDebug = true
  public URL_BASE = path => `${this.URL_SERVICIOS}/${path}`

  constructor() {}
}
