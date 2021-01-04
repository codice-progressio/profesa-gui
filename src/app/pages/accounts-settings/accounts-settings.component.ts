import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styles: []
})
export class AccountsSettingsComponent implements OnInit {


  constructor( public settingsServices: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck( link );
    // Asigna el color del tema.
    this.settingsServices.aplicarTema( tema );

  }

  aplicarCheck( link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');

    const tema = this.settingsServices.ajustes.tema;
    for ( const ref of selectores) {
      if (tema === ref.getAttribute('data-theme') ) {
        ref.classList.add('working');
        break;
      }
    }



  }

}
