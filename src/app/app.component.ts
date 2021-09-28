import { Component } from '@angular/core'
import { OfflineService } from './services/offline.service'
import { SettingsService } from './services/settings/settings.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public _ajustes: SettingsService,
    //Inicializamos los servicios de indexed-db
    private offlinseService: OfflineService
    
    
    ) {
    
  }
}
