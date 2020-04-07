import { by, browser, element } from "protractor";
import { BuscarPersonaPage } from './page-object/buscar-persona.po';


describe('Iniciando test', () => {
  let buscarPersona: BuscarPersonaPage;

  beforeEach(() => {
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

  it('Busco una persona que este registrada dentro del sistema', () => {
    // ingreo numero de documento
    buscarPersona.ingresarDocumento('29232132');
    // hago click en buscar
    buscarPersona.buscar();
    // espero la respuesta
    browser.waitForAngular();
    // Obtengo mensaje
    let mensaje = buscarPersona.buscarPersonaElemento().element(by.css('div.d-flex')).element(by.css('div.alert')).getText();
    // confirmo el error
    expect(mensaje).toBe('Esta persona ya ha sido registrada.');
  });

  it('Verifico los campos ingresando caracteres', () => {
    // ingreso una palabra
    buscarPersona.ingresarDocumento('hola');
    // obtengo el valor del elemento
    let valueElement = buscarPersona.buscarPersonaElemento().element(by.id('buscar-persona')).getAttribute('value');
    // verifico que este en vacio
    expect(valueElement).toEqual('');
  });

});
