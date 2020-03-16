import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './shared';

const routes: Routes = [
//  { path: 'login', component: LoginComponent },
  {
    path: 'buscar-persona',
    data: { title: 'Inicio' },
    component: AppLayoutComponent,
    children: [
      { path: '',
        loadChildren: './registrar/registrar.module#RegistrarModule'
      },
    /*  { path: 'destinatario',
        loadChildren: './destinatario/destinatario.module#DestinatarioModule',
        canActivate: [AuthGuard],
        data: { preload: true, title: 'Lista destinatarios', breadcrumb: 'Destinatarios' }
      }*/
    ]
  },
  {
    path: 'beneficiario',
    component: AppLayoutComponent,
    children: [{
      path: '',
      //canActivate: [AuthGuard],
      loadChildren: './beneficiario/beneficiario.module#BeneficiarioModule'
    }]
  },
  //{ path: 'login', data: { title: "Iniciar sesión" }, loadChildren: './login/login.module#LoginModule' },
  { path: '**', redirectTo: 'buscar-persona', pathMatch: 'full' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{})
      ],
    exports: [
        RouterModule
    ],
    providers: [
        /* AuthGuard,
        AppCustomPreloader */
    ]
})
export class AppRoutingModule { }
