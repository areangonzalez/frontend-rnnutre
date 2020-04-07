import { by, browser, element } from "protractor";
import { BuscarPersonaPage } from './page-object/buscar-persona.po';
import { FormularioRegistrarPersonaPage } from "./page-object/formulario-registrar-persona.po";


describe('Iniciando test', () => {
  let buscarPersona: BuscarPersonaPage;
  let formularioRegistro: FormularioRegistrarPersonaPage;

  beforeAll(() => {
    browser.get('/');

    buscarPersona = new BuscarPersonaPage();
    formularioRegistro = new FormularioRegistrarPersonaPage();
  });

  it('Busco una persona no registrda en nutre, pero existente en registral', () => {
    // ingreso numero de documento
    buscarPersona.ingresarDocumento('29857364');
    // busco a la persona
    buscarPersona.buscar();
    // espero la respuesta
    browser.waitForAngular();
    // obtengo el boton de registrar
    let btnRegistrar = buscarPersona.regitrar();
    // ingreso al formulario de persona
    btnRegistrar.click();
    // espero la redireccion del sistema
    browser.waitForAngular();
    // verifico si estoy en el formulario de registro
    expect(formularioRegistro.registrarPersonaElemento().isPresent()).toBeTruthy();
  });


});
