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
          { id: 1, nro_documento: '29857364', nombre: 'Marcos', apellido: 'Gonzalez', cantidad_hijo: 3, edad_por_hijo: '12, 13, 15', lugar: { localidadid: 2, calle: 'cipolletti', altura: '232', barrio: 'san martin' }, lista_red_social: [], telefono: '2920634455', celular: '', email: '' },
          {id: 2, nro_documento: '29232132', nombre: 'Pedro', apellido: 'Avila'}
        ];
        let beneficiario = [
          {
            id: 1, personaid: 2, estado: "pendiente", cantidad_hijo: 3, edad_por_hijo: '12, 13, 15',
            persona: { id:2, nro_documento: '29857364', nombre: 'Marcos', apellido: 'Gonzalez', lugar: { localidadid: 9, calle: 'cipolletti', altura: '232', barrio: 'san martin', localidad: "Viedma" }, lista_red_social: [], telefono: '2920634455', celular: '', email: '' }
          },
          {
            id: 2, personaid: 3, estado: "admitido", cantidad_hijo: 1, edad_por_hijo: '12',
            persona: { id: 3, nro_documento: '23654224', nombre: 'Sofia', apellido: 'Benitez', lugar: { localidadid: 2, calle: 'mata negra', altura: '232', barrio: 'Inalauquen', localidad: "Bariloche" }, lista_red_social: [{tipo_red_socialid:1, tipo_red_social: "Facebook", perfil:"https://www.facebook.com/sofi.benitez", icono_class: "fab fa-facebook-square"}], telefono: '2920657654', celular: '', email: '' }
          },
          {
            id: 3, personaid: 4, estado: "admitido", cantidad_hijo: 2, edad_por_hijo: '12, 15',
            persona: { id: 4, nro_documento: '28765434', nombre: 'Carlos', apellido: 'Fernandez', lugar: { localidadid: 9, calle: 'Moreno', altura: '33', barrio: 'Mitre', localidad: "Viedma" }, lista_red_social: [], telefono: '2920202934', celular: '2920202033', email: '' }
          },
          {
            id: 4, personaid: 5, estado: "pendiente", cantidad_hijo: 5, edad_por_hijo: '12, 13, 15, 22, 6',
            persona: { id: 5, nro_documento: '23345674', nombre: 'Jose', apellido: 'Ponce', lugar: { localidadid: 2, calle: 'San luis', altura: '1187', barrio: 'Fatima', localidad: "Bariloche" }, lista_red_social: [{tipo_red_socialid:2, tipo_red_social: "Instagram", perfil:"https://www.instagram.com/joseponce", icono_class: "fab fa-facebook-square"}], telefono: '2920233765', celular: '2920206525', email: '' }
          }
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

            // LOGIN
            if (request.url.endsWith('/apimock/usuarios/login') && request.method === 'POST') {
              if (request.body.username === 'admin' && request.body.password === 'admins') {
                // if login details are valid return 200 OK with a fake jwt token
                let body = {
                    username: 'admin',
                    access_token: 'fake-jwt-token'
                };
                return of(new HttpResponse({ status: 200, body }));
              } else {
                  // else return 400 bad request
                  return throwError( { code:0,status: 500, message: 'Usuario o contraseña inconrrecta' } );
              }
            }

            // GUARDAR BENEFICIARIO
            if (request.url.endsWith('/apimock/beneficiarios') && request.method === 'POST') {
                // get new user object from post body
                let nuevoBeneficiario = request.body;
                console.log(nuevoBeneficiario);
                // validation
                let duplicateBeneficiario = beneficiario.filter(beneficiario => { return beneficiario.personaid === nuevoBeneficiario.id; }).length;
                if (duplicateBeneficiario) {
                    return throwError({ error: { message: 'El beneficiario ya esta registrado'} });
                }
                let idBeneficiario:any = beneficiario.length + 1;
                // save new beneficiario

                beneficiario.push({
                  id: idBeneficiario, personaid: nuevoBeneficiario.id, estado: "pendiente",
                  cantidad_hijo: nuevoBeneficiario.cantidad_hijo, edad_por_hijo: nuevoBeneficiario.edad_por_hijo,
                  persona: {
                    id: nuevoBeneficiario.id, nro_documento: nuevoBeneficiario.nro_documento, nombre: nuevoBeneficiario.nombre, apellido: nuevoBeneficiario.apellido,
                    lugar: {
                      localidadid: nuevoBeneficiario.lugar.localidadid, calle: nuevoBeneficiario.lugar.calle, altura: nuevoBeneficiario.lugar.altura, barrio: nuevoBeneficiario.lugar.barrio, localidad: nuevoBeneficiario.lugar.localidad
                    },
                    lista_red_social: nuevoBeneficiario.lista_red_social,
                    telefono: nuevoBeneficiario.telefono, celular: nuevoBeneficiario.celular, email: nuevoBeneficiario.email
                  }
                });
                localStorage.setItem('beneficiario', JSON.stringify(beneficiario));

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: { id: idBeneficiario } }));
            }

            // GET BEEFICIARIOS
            if (request.url.endsWith('/apimock/beneficiarios') && request.method === 'GET') {
              // let pageSize: number = parseInt(request.params.get('pagesize'));
              let page: number = parseInt(request.params.get("page"));
              let pageSize: number = 2;
              // parametros de busqueda
              let localidadid = request.params.get('localidadid');
              let estado = request.params.get('estado');
              let global_search = request.params.get('global_param');
              let search = [''];
              if(global_search) {
                search = global_search.split(" ");
              }
              // Objeto para el filtro de resultado de beneficiarios
              let filtroBeneficiario = {
                "success": true,
                "pagesize": pageSize,
                "pages": 0,
                "total_filtrado": 0,
                "resultado": [],
              };

              // aplico la busqueda para el array de beneficiario
              let beneficiariosEncontrados = beneficiario.filter(
              beneficiario => {
                for (let i = 0; i < search.length; i++) {
                  let nombre = beneficiario.persona.nombre.split(" ");
                  for (let j = 0; j < nombre.length; j++) {
                      if ( nombre[j].toLowerCase().indexOf(search[i].toLowerCase()) > -1  ) {
                        return beneficiario;
                      }
                  }
                  if (beneficiario.persona.nro_documento.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ){
                    return beneficiario;
                  }
                  if ( beneficiario.persona.apellido.toLowerCase().indexOf(search[i].toLowerCase()) > -1 ) {
                    return beneficiario;
                  }
                }
              });
              if (localidadid) {
                beneficiariosEncontrados = beneficiariosEncontrados.filter(beneficiario => { return parseInt(localidadid) === beneficiario.persona.lugar.localidadid; });
              }
              if (estado) {
                beneficiariosEncontrados = beneficiariosEncontrados.filter(beneficiario => { return estado === beneficiario.estado; });
              }

              // despues de la busqueda
              let totalFiltrado: number = beneficiariosEncontrados.length;
              //let totalFiltrado: number = beneficiario.length;
              let total:number = totalFiltrado/pageSize;
              let numEntero = Math.floor(total);
              let totalPagina:number = (total > numEntero) ? numEntero + 1 : total;

              filtroBeneficiario.total_filtrado = beneficiariosEncontrados.length;
              //filtroBeneficiario.total_filtrado = beneficiario.length;
              filtroBeneficiario.pages = totalPagina;
              filtroBeneficiario.resultado = beneficiariosEncontrados;
              //filtroBeneficiario.resultado = beneficiario;
              // Armo el paginado
              if (page > 0) {
                page = page;
                let pageStart = page * pageSize;
                let pageEnd = pageStart + pageSize;
                filtroBeneficiario.resultado = beneficiariosEncontrados.slice(pageStart, pageEnd);
                //filtroBeneficiario.resultado = beneficiario.slice(pageStart, pageEnd);
              }else{
                filtroBeneficiario.resultado = beneficiariosEncontrados.slice(0,pageSize);
                // filtroBeneficiario.resultado = beneficiario.slice(0,pageSize);
              }

              // respond 200 OK
              return of(new HttpResponse({ status: 200, body: filtroBeneficiario }));
          }

          if (request.url.match(/\/apimock\/beneficiarios\/\d+$/) && request.method === 'GET') {
            // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
            /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                // find user by id in users array
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                let beneficiarioEncontrado:any;

                for (let i = 0; i < beneficiario.length; i++) {
                    if (beneficiario[i].id === id) {
                      beneficiarioEncontrado = beneficiario[i];
                      break;
                    }
                }

                // respond 200 OK
                return of(new HttpResponse({ status: 200, body: beneficiarioEncontrado }));
          }

            // delete user
            if (request.url.match(/\/apimock\/beneficiarios\/\d+$/) && request.method === 'PUT') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                /* if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') { */
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let parametros = request.body;



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
