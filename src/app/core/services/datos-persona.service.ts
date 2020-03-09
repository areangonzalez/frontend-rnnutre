import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PersonaModel } from "../models";


@Injectable()
export class DatosPersonaService {
  private personaSubject = new BehaviorSubject({});
  private persona: IPersona;
  constructor(){}

  getPersona(): Observable<object> {
    return this.personaSubject.asObservable();
  }

 addPersona(persona: IPersona) {
      this.persona = persona;
      this.update();
  }

  private update() {
    this.personaSubject.next(this.persona);
  }

}
