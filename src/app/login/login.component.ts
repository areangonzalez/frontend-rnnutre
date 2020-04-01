import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public msjUsuario: string = '';
  public msjPass: string = '';
  public errorAutenticacion: boolean = false;

  constructor( private _fb: FormBuilder, private _usuarioService: AuthenticationService, private _router: Router ){
    this.loginForm = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(){

  }

  ingresar() {
    this.submitted = true;
    this.msjUsuario = '';
    this.msjPass = '';
    this.errorAutenticacion = false;

    if (this.loginForm.invalid) {
      if (this.msjPass == '' && this.loginForm.get('username').hasError('required')){
        this.msjUsuario = "Por favor ingrese un nombre de usuario.";
      }else if ( this.msjUsuario == '' && this.loginForm.get('password').hasError('required')){
        this.msjPass = "Por favor ingrese una contraseña.";
      }
      return;
    }else{
      // generar servicio para loguear un usuario
      this.autenticarUsuario(this.loginForm.value);
    }
  }

  autenticarUsuario(params){
    this._usuarioService.logueo(params)
    .pipe(first())
    .subscribe(
      respuesta => {
        this._router.navigate(['/beneficiarios']);
      },error => {
        this.errorAutenticacion = true;
      }
    )
  }

}
