import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor (
    public _usuarioService: UsuarioService,
    public router: Router,
  ) {}
  canActivate(): Promise<boolean> | boolean {
    const token = localStorage.getItem('token')
    if( !token ) {
      this.navegarAlLogin()
      return false
    }
    // Recuperar la fecha de expiración del token.
    const payload = JSON.parse( atob( token.split('.')[1] ));

    const expirado = this.expirado(payload.exp);

    if (expirado ) {

      this.navegarAlLogin()
      this._usuarioService._msjService.informar('Sesion caduca')
      return false;
    }

    return this.verificaRenueva( payload.exp);
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    // tslint:disable-next-line:no-shadowed-variable
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date( fechaExp * 1000);
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate( ['/login']);
            reject(false);
          });
      }

    });
  }

  expirado( fechaExp: number) {
    // Tomanos la hora actual para compar con el token
    const ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

  }


  navegarAlLogin(){
    this._usuarioService.logout()
    localStorage.clear()
    this.router.navigate(['/login'])
  }

}
