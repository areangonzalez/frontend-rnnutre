import { browser, by, element } from 'protractor';

export class FormularioRegistrarPersonaPage {
  // componente de registro-persona
  registrarPersonaElemento() {
    return element(by.tagName('registrar-persona'));
  }
  // formulario persona
  formularioPersonaElemento() {
    return this.registrarPersonaElemento().element(by.tagName('formulario-persona'));
  }
  // formulario contacto
  formularioContactoElemento() {
    return this.registrarPersonaElemento().element(by.tagName('formulario-contacto'));
  }
  // formulario lugar
  formularioLugarElemento() {
    return this.registrarPersonaElemento().element(by.tagName('formulario-lugar'));
  }
  // campo del numero de documento en formulario persona
  campoNroDocumento() {
    return this.formularioPersonaElemento().element(by.id('nro_documento'));
  }
  // campo del nombre en formulario persona
  campoNombre() {
    return this.formularioPersonaElemento().element(by.id('nombre'));
  }
  // campo de celular en formulario contacto
  campoCelular() {
    return this.formularioContactoElemento().element(by.id('celular'));
  }
  //campo barrio en formulario lugar
  campoBarrio() {
    return this.formularioLugarElemento().element(by.id('barrio'));
  }
  // boton cancelar formulario
  cancelarFormulario() {
    return this.registrarPersonaElemento().element(by.css('div.justify-content-between')).element(by.css('button.btn-danger'));
  }
  // boton guardar formulario
  guardarFormulairo() {
    return this.registrarPersonaElemento().element(by.css('div.justify-content-between')).element(by.css('button.btn-success'));
  }


}
