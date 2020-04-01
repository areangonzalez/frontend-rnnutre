import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor( private _fb: FormBuilder ){
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

    if (this.loginForm.invalid) {
      if (this.msjPass == '' && this.loginForm.get('username').hasError('required')){
        this.msjUsuario = "Por favor ingrese un nombre de usuario.";
      }else if ( this.msjUsuario == '' && this.loginForm.get('password').hasError('required')){
        this.msjPass = "Por favor ingrese una contraseña.";
      }
      return;
    }else{
      // generar servicio para loguear un usuario

    }
  }

  /* userLogin(params){
    this.
  } */

}
