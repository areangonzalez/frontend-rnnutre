import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiarioComponent } from './beneficiario.component';
import { BeneficiarioService, LocalidadService } from '../core/services';
import { AuthGuard } from '../core/guards';

const routes: Routes = [
  {
    path: '', component: BeneficiarioComponent, data: { title: 'Beneficiarios' },
    canActivate: [AuthGuard],
    resolve: { beneficiarios: BeneficiarioService, localidades: LocalidadService },
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ,LocalidadService, BeneficiarioService ]
})
export class BeneficiarioRoutingModule { }
