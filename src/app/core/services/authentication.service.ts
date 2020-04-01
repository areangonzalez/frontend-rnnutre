import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthenticationService {

  constructor(private _apiService: ApiService, private _jwtService: JwtService) { }

  /**
   * busco los beneficiarios segun criterio de busqueda
   * @param params criterios de busqueda de un beneficiario
   */
  logueo(params:any) {
    return this._apiService.post('/login', {
      username: params.username,
      password: params.password
    }).pipe(map((res: any) => {
      if (res && res.access_token) {
        let data = { username: '', token: '' };
        data.username = res.username;
        data.token = res.access_token;

        this._jwtService.saveToken(data);
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

  getUserName() {
    let userLogin = this._jwtService.getToken();

    return userLogin.datosToken.username;
  }

}
