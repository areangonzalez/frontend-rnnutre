import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiarioComponent } from './beneficiario.component';
import { BeneficiarioService, LocalidadService } from '../core/services';

const routes: Routes = [
  {
    path: '', component: BeneficiarioComponent, data: { title: 'Beneficiarios' },
    resolve: { beneficiarios: BeneficiarioService, localidades: LocalidadService }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LocalidadService, BeneficiarioService]
})
export class BeneficiarioRoutingModule { }
