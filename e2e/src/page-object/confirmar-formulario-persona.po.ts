import { browser, by, element } from 'protractor';

export class ConfirmarFormularioPersonaPage {
  // componente de registro-persona
  confirmarDatosElemento() {
    return element(by.tagName('confirmar-datos'));
  }

  botonConfirmar() {
    return this.confirmarDatosElemento().element(by.css('div.justify-content-between')).element(by.css('button.btn-success'));
  }

}
