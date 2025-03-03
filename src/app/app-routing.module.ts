import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './authenticated_section/home/home.component';
import { HomeUnauthenticatedComponent } from './unauthenticated_section/home-unauthenticated/home-unauthenticated.component';

const routes: Routes = [

  { path: "", component: HomeUnauthenticatedComponent },
  { path: "home", component: HomeComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
