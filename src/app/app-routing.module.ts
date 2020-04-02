import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './shared';
import { AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'buscar-persona',
    data: { title: 'Buscar Persona' },
    component: AppLayoutComponent,
    children: [{
      path: '',
      loadChildren: './registrar/registrar.module#RegistrarModule'
    }]
  },
  {
    path: 'beneficiario',
    component: AppLayoutComponent,
    children: [{
      path: '',
      canActivate: [AuthGuard],
      loadChildren: './beneficiario/beneficiario.module#BeneficiarioModule'
    }]
  },
  { path: 'login', data: { title: "Iniciar sesión" }, loadChildren: './login/login.module#LoginModule' },
  { path: '**', redirectTo: 'buscar-persona', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{})
      ],
    exports: [
        RouterModule
    ],
    providers: [ AuthGuard ]
})
export class AppRoutingModule { }
