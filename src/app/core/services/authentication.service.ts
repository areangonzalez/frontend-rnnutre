import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthenticationService {

  constructor(private _apiService: ApiService, private _jwtService: JwtService) { }

  /**
   * Logueo de un usuario en el sistema
   * @param username nombre de usuario
   * @param password contraseña del usuario
   */
  logueo(username: string, password: string) {
    return this._apiService.post('/usuarios/login', { username, password })
    .pipe(map((user: any) => {
      if (user && user.access_token) {
        let data = { username: '', token: ''};
        // completo los datos en el objeto
        data.username = user.username;
        data.token = user.access_token;
        // guardo los datos de logueo
        this._jwtService.saveToken(data);

        return user;
      }
    }));
  }

  logout() {
    // remove user from local storage to log user out
    this._jwtService.destroyToken();
  }

  loggedIn() {
    let userLogin = this._jwtService.getToken();
    if(userLogin && userLogin.datosToken) {
      return true;
    }else{
      return false;
    }
  }

  getUser() {
    let user = this._jwtService.getToken();
    return user.datosToken;
  }

  getUserName() {
    let userLogin = this._jwtService.getToken();

    return userLogin.datosToken.username;
  }

}
