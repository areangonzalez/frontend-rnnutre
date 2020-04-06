import { by, browser, element } from "protractor";
import { BuscarPersonaPage } from './page-object/buscar-persona.po';


describe('Iniciando test', () => {
  let buscarPersona: BuscarPersonaPage;

  beforeAll(() => {
    browser.get('/');

    buscarPersona = new BuscarPersonaPage();
  });
  //
  it('Busco una persona NO registrada en el sistema', () => {
    // ingreso un numero de documento
    buscarPersona.ingresarDocumento('25675436');
    // hago click en el boton de buscar
    buscarPersona.buscar();
    // espero al que el sistema busque
    browser.waitForAngular();

    expect(buscarPersona.regitrar().isPresent()).toBeTruthy();
  });

});
