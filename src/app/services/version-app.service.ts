import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'
import packageInfo from '../../../package.json'

@Injectable({
  providedIn: 'root'
})
export class VersionAppService {
  api = new ReplaySubject<string>(null)
  ui = new ReplaySubject<string>(null)
  constructor() {
    this.ui.next(packageInfo.version)
  }
}
