import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, MensajeService } from '../core/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public mensaje: string = '';
  public huboError: boolean = false;
  public show = false;

  constructor( private _fb: FormBuilder, private _usuarioService: AuthenticationService, private _router: Router, private _mensajeService: MensajeService ){
    this.loginForm = _fb.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(){
    this.isLogin();
  }

  ingresar(){
    this._usuarioService.logueo(this.loginForm.value)
    .pipe(first())
    .subscribe(
      respuesta => {
        this._router.navigate(['/beneficiario']);
      }, error => {
        this.loginForm.patchValue({ username: '', password: '' });
        this.huboError = true;
        this.mensaje = "Usuario o contraseña no son validos";
      }
    );
  }

  private isLogin(){
    if (localStorage.getItem('token-nutre') != null) {
      this._router.navigate(['/beneficiario']);
    }
  }
}
