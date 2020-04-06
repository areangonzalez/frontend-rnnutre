import { browser, by, element } from 'protractor';

export class BuscarPersonaPage {
  // buscar persona
  buscarPersonaElemento() {
    return element(by.tagName('registrar-buscar-persona'));
  }


  ingresarDocumento(documento:string) {
    return this.buscarPersonaElemento().element(by.id('buscar-persona')).sendKeys(documento);
  }

  buscar() {
    return this.buscarPersonaElemento().element(by.css('div.input-group-append')).element(by.css('button.btn-outline-secondary')).click();
  }

  regitrar() {
    return this.buscarPersonaElemento().element(by.css('div.d-flex')).element(by.css('button.btn-primary'));
  }

}
