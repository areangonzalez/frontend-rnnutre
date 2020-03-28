import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from './../models';


@Injectable({
  providedIn: 'root'
})

export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();

    loaderState = this.loaderSubject.asObservable();

    constructor() { }



    show() {
      console.log("Muestra");

        this.loaderSubject.next(<LoaderState>{show: true});
    }

    hide() {
      console.log("Oculta");
        this.loaderSubject.next(<LoaderState>{show: false});
    }
}
