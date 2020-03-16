import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiarioComponent } from './beneficiario.component';

const routes: Routes = [
  {
    path: '', component: BeneficiarioComponent, data: { title: 'Beneficiarios' }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BeneficiarioRoutingModule { }
