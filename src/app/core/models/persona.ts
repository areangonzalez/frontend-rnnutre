interface IPersona {
  id: number;
  nombre: string;
  apellido: string;
  nro_documento: string;
  cantidad_hijo: string;
  edad_por_hijo: string;
  telefono: string;
  celular: string;
  email: string;
  lugar: {
      barrio: string,
      calle: string,
      altura: string,
      localidadid: number,
      localidad: string
  },
  lista_red_social: any[]
};
