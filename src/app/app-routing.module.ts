import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
  },
  {
    path:'home',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path:'**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
