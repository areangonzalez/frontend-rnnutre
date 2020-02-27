import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './shared';

const routes: Routes = [
//  { path: 'login', component: LoginComponent },
  {
    path: '',
    data: { title: 'Inicio' },
    component: AppLayoutComponent,
    /* children: [
      { path: '',
        canActivate: [AuthGuard],
        loadChildren: './inicio/inicio.module#InicioModule'
      },
      { path: 'destinatario',
        loadChildren: './destinatario/destinatario.module#DestinatarioModule',
        canActivate: [AuthGuard],
        data: { preload: true, title: 'Lista destinatarios', breadcrumb: 'Destinatarios' }
      }
    ] */
  },
  // {
  //   path: 'admin', data: { title: "admin" },
  //   component: AdminLayoutComponent,
  //   children: [{
  //     path: '',
  //     canActivate: [AuthGuard],
  //     loadChildren: './admin/admin.module#AdminModule'
  //   }]
  // },
  //{ path: 'login', data: { title: "Iniciar sesión" }, loadChildren: './login/login.module#LoginModule' },
  //{ path: '**', redirectTo: 'inicio', pathMatch: 'full' },
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
