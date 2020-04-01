import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

    getToken() {
        return JSON.parse(localStorage.getItem('token-nutre'));
    }

    saveToken(datosToken: object) {
        localStorage.setItem('token-nutre', JSON.stringify({ datosToken }));
    }

    destroyToken() {
        localStorage.removeItem('token-nutre');
    }

}
