import { browser, by, element } from 'protractor';

export class MensajesAlertPage {
  // componente de registro-persona
  mensajeAlertElemento() {
    return element(by.tagName('mensajes-alert'));
  }

  tituloAlert() {
    return this.mensajeAlertElemento().element(by.css('div.mensaje-alert-header')).element(by.tagName('h4')).getText();
  }

  obtenerMensajeTexto() {
    return this.mensajeAlertElemento().element(by.css('div.mensaje-alert-body')).element(by.tagName('p')).getText();
  }

  botonAceptarExitoso() {
    return this.mensajeAlertElemento().element(by.css('div.float-right')).element(by.css('button.btn-success'));
  }

}
