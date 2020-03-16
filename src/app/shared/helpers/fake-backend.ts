import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        let personas = [
          { id: 1, nro_documento: '29857364', nombre: 'Marcos', apellido: 'Gonzalez', cant_hijo: 3, edad_por_hijo: '12, 13, 15', lugar: { localidadid: 2, calle: 'cipolletti', altura: '232', barrio: 'san martin' }, lista_red_social: [], telefono: '2920634455', celular: '', email: '' },
          {id: 2, nro_documento: '29232132', nombre: 'Pedro', apellido: 'Avila'}
        ];
        let beneficiario = [
          { id: 1, personaid: 2 }
        ];
        let tipoRedSocial = [
          {"id": 1, "nombre": "Facebook", "icono_class": "fab fa-facebook-square", "url_1": "https://www.facebook.com/" },
          {"id": 2, "nombre": "Instagram", "icono_class": "fab fa-instagram", "url_1": "https://www.instagram.com/" },
          {"id": 3, "nombre": "Linkedin", "icono_class": "fab fa-twitter", "url_1": "https://www.linkedin.com/in/" },
          {"id": 4, "nombre": "Twitter", "icono_class": "fab fa-linkedin-in", "url_1": "https://twitter.com/" }
        ];
        let localidades = [
          { "id": 1, "nombre": "Aguada de Guerra" }, { "id": 2, "nombre": "Bariloche" }, { "id": 3, "nombre": "Choele Choel" }, { "id": 4, "nombre": "Cinco Saltos" }, { "id": 5, "nombre": "Cipolletti" }, { "id": 6, "nombre": "Coronel Belisle" }, { "id": 7, "nombre": "General Roca" }, { "id": 8, "nombre": "Río colorado" }, { "id": 9, "nombre": "Viedma" }, { "id": 10, "nombre": "Villa Regina" }
        ];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // Buscar por documento - persona
            if (request.url.match(/\/apimock\/personas\/buscar\-por\-documento\/\d+$/) && request.method === 'GET') {
                // variables
                let urlParts = request.url.split('/');
                let nro_documento = urlParts[urlParts.length - 1];
                let mensaje:string = 'Esta persona no existe.';
                let personaRegistrada = false;

                // busco si la persona se encuentra en registral.
                let buscoPersona = personas.filter(persona => { return persona.nro_documento === nro_documento; });
                let personaEncontrada = buscoPersona.length ? buscoPersona[0] : null;

                if (personaEncontrada !== null) {
                  // verifico si la persona esta registrada en programa
                  let buscoPersonaEnprograma = beneficiario.filter(beneficiario => { return beneficiario.personaid === personaEncontrada.id; });
                  personaRegistrada = buscoPersonaEnprograma.length ? true : false;
                }else {
                  return of(new HttpResponse({ status: 200, body: {beneficiario: false} }));
                }

                if (!personaRegistrada){
                  personaEncontrada["beneficiario"] = personaRegistrada;
                  return of(new HttpResponse({ status: 200, body: personaEncontrada }));
                } else {
                  // else return 400 bad request
                  return of(new HttpResponse({ status: 200, body: { beneficiario: personaRegistrada } }));
                }
            }
            /* Tipo red social get */
            if (request.url.endsWith('/apimock/tipo-red-socials') && request.method === 'GET') {
              return of(new HttpResponse({ status: 200, body: tipoRedSocial }));
            }
            // get localidades
            if (request.url.endsWith('/apimock/localidads') && request.method === 'GET') {
                  return of(new HttpResponse({ status: 200, body: localidades }));
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    return of(new HttpResponse({ status: 200, body: users }));
                /* } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                } */
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                /* } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                } */
            }

            // GUARDAR BENEFICIARIO
            if (request.url.endsWith('/apimock/beneficiarios') && request.method === 'POST') {
                // get new user object from post body
                let nuevoBeneficiario = request.body;

                // validation
                let duplicateBeneficiario = beneficiario.filter(beneficiario => { return beneficiario.personaid === nuevoBeneficiario.id; }).length;
                if (duplicateBeneficiario) {
                    return throwError({ error: { message: 'El beneficiario ya esta registrado'} });
                }
                let idBeneficiario = beneficiario.length + 1;
                // save new beneficiario
                beneficiario.push({
                  "id": idBeneficiario,
                  "personaid": nuevoBeneficiario.id
                });
                localStorage.setItem('beneficiario', JSON.stringify(beneficiario));

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: idBeneficiario } }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                /* } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                } */
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
