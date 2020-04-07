import { by, browser, element } from "protractor";
import { BuscarPersonaPage } from './page-object/buscar-persona.po';
import { FormularioRegistrarPersonaPage } from "./page-object/formulario-registrar-persona.po";


describe('Iniciando test', () => {
  let buscarPersona: BuscarPersonaPage;
  let formularioRegistro: FormularioRegistrarPersonaPage;
  const dni = '29857364';
  beforeAll(() => {
    browser.get('/');

    buscarPersona = new BuscarPersonaPage();
    formularioRegistro = new FormularioRegistrarPersonaPage();
  });

  it('Busco una persona no registrda en nutre, pero existente en registral', () => {
    // ingreso numero de documento
    buscarPersona.ingresarDocumento(dni);
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

  describe('Verificacion de datos de la persona', () => {
    it('verifico el nombre de la persona', () => {
      // obtengo el nombre de la persona
      let nombrePersona = formularioRegistro.campoNombre().getAttribute('value');
      // verifico que el nombre este correcto
      expect(nombrePersona).toBe('Marcos');
    });

    it('verifico el barrio de la persona', () => {
      // obtengo el barrio de la persona
      let barrioPersona = formularioRegistro.campoBarrio().getAttribute('value');

      expect(barrioPersona).toBe('san martin');
    });

    it('verifico el numero de documento de la persona', () => {
      // obtengo numero de documento
      let dniPersona = formularioRegistro.campoNroDocumento().getAttribute('value');
      // verifico el numero de documento de la persona
      expect(dniPersona).toBe(dni);
    });
  });



});
