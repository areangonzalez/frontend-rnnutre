import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiarioComponent } from './beneficiario.component';
import { BeneficiarioService } from '../core/services';

const routes: Routes = [
  {
    path: '', component: BeneficiarioComponent, data: { title: 'Beneficiarios' },
    resolve: { beneficiarios: BeneficiarioService }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BeneficiarioRoutingModule { }
