import { browser, by, element } from 'protractor';

export class FormularioRegistrarPersonaPage {
  // buscar persona
  registrarPersonaElemento() {
    return element(by.tagName('registrar-persona'));
  }

}
