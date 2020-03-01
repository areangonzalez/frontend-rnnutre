import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/* import { JwtService } from './jwt.service'; */
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        /* private jwtService: JwtService */
    ) { }

    private formatErrors(error: any) {
        return throwError(error);
    }

    public formatParams(httpParams: HttpParams = new HttpParams(),params:Object){
      for (const key in params) {
        httpParams = httpParams.append(key.toString(), params[key].toString());
      }
      return httpParams;
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.baseUrl}${path}`, { params })
            .pipe(
              catchError(this.formatErrors)
            );
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.baseUrl}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${environment.baseUrl}${path}`
        ).pipe(catchError(this.formatErrors));
    }

    getFile(path: string, body: object): Observable<any> {
      return this.http.get(
        `${environment.baseUrl}${path}`,
        body
      ).pipe(catchError(this.formatErrors));
    }
}
