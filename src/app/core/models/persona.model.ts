
export class PersonaModel {
  id: number;
  nombre: string;
  apellido: string;
  nro_documento: string;
  telefono: string;
  celular: string;
  email: string;
  lugar: {
      barrio: string,
      calle: string,
      altura: string,
      localidadid: number
  };

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.nro_documento = '';
    this.telefono = '';
    this.celular = '';
    this.email = '';
    this.lugar = {
        barrio:'',
        calle:'',
        altura:'',
        localidadid:0
    }
  }

    public deserealize(input: object) {
      let persona = new PersonaModel();
      for (const key in input) {
        for (const clave in persona) {
          if (key === 'contacto') {
            for (const k in input['contacto']) {
              if(clave === k){
                persona[clave] = input['contacto'][clave];
              }
            }
          }else if( clave === key) {
            persona[clave] = input[clave];
          }
        }
      }

      return persona;
    }


}
