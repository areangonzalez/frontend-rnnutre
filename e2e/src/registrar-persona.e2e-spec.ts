import { by, browser, element } from "protractor";
import { BuscarPersonaPage } from './page-object/buscar-persona.po';
import { FormularioRegistrarPersonaPage } from "./page-object/formulario-registrar-persona.po";
import { ConfirmarFormularioPersonaPage } from "./page-object/confirmar-formulario-persona.po";
import { MensajesAlertPage } from "./page-object/mensajes-alert.po";


describe('Iniciando test', () => {
  let buscarPersona: BuscarPersonaPage;
  let formularioRegistro: FormularioRegistrarPersonaPage;
  let confirmarDatos: ConfirmarFormularioPersonaPage;
  let alertaMensaje: MensajesAlertPage;

  const dni = '29857364';

  beforeAll(() => {
    browser.get('/');

    buscarPersona = new BuscarPersonaPage();
    formularioRegistro = new FormularioRegistrarPersonaPage();
    confirmarDatos = new ConfirmarFormularioPersonaPage();
    alertaMensaje = new MensajesAlertPage();
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

  describe('Agrego celular y guardo formulario', () => {
    it('agrego un numero de celular', () => {
      let nroCelular = '29206344556';
      // obtengo el campo de celular
      let celularPersona = formularioRegistro.campoCelular();
      // agrego un celular
      celularPersona.sendKeys(nroCelular);
      // verifico que se haya agregado correctamente
      expect(celularPersona.getAttribute('value')).toBe(nroCelular);
    });

    it('guardo el formulario', () => {
      // cliqueo el boton de guardar
      formularioRegistro.guardarFormulairo().click();
      // espero respuesta
      browser.waitForAngular();
      // verifico que estoy en pagina de confirmacion de datos
      expect(confirmarDatos.confirmarDatosElemento().isPresent()).toBeTruthy();
    });

  });

  describe('confirmo los datos para guardar', () => {
    it('confirmo y espero el mensaje de guardado exitos', () => {
      // cliqueo en el boton confirmar
      confirmarDatos.botonConfirmar().click();
      //espero respuesta
      browser.waitForAngular();
      // verifico el mensaje de exitoso
      expect(alertaMensaje.tituloAlert()).toBe('Exitoso');
    });

    it('verifico mensaje', () => {
      let mensaje = alertaMensaje.obtenerMensajeTexto();

      expect(mensaje).toBe('Se han guardado los datos de la persona.');
    })

    it('acepto el alert', () => {
      // click en boton de'acptar
      alertaMensaje.botonAceptarExitoso().click();
      //espero respuesta
      browser.waitForAngular();
      //verifico que estoy en pagina de busqueda para agregar otro usuario
      expect(buscarPersona.buscarPersonaElemento().isPresent()).toBeTruthy();
    });

  });

  afterAll(function () {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

});
