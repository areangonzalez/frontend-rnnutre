import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
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
  public returnUrl: string;

  constructor( private _fb: FormBuilder, private _usuarioService: AuthenticationService, private _route: ActivatedRoute, private _router: Router, private _mensajeService: MensajeService ){
    this.loginForm = _fb.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(){
    // reinicio el estado de login
    this._usuarioService.logout();

    // obtengo la url por default o lo vuelvo a /beneficiario
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/beneficiario';
  }

  ingresar(){
    this._usuarioService.logueo(this.loginForm.get('username').value, this.loginForm.get('password').value)
    .pipe(first())
    .subscribe(
      respuesta => {
        if (respuesta.access_token){
          //redirecciono el login
          this._router.navigate([this.returnUrl]);
        }
      }, error => {
        this.loginForm.patchValue({ username: '', password: '' });
        this.huboError = true;
        this.mensaje = "Usuario o contraseña no son validos";
      }
    );
  }

}
