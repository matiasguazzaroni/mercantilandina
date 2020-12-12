import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliationMainComponent } from './components/affiliation/affiliation-main/affiliation-main.component';

const routes: Routes = [
  { path: 'affiliation', component: AffiliationMainComponent},
  { path: '', pathMatch: 'full', redirectTo: 'affiliation'},
  { path: '**', pathMatch: 'full', redirectTo: 'affiliation' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
