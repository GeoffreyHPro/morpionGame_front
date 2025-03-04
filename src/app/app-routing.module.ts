import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUnauthenticatedComponent } from './unauthenticated_section/home-unauthenticated/home-unauthenticated.component';
import { UserSectionComponent } from './authenticated_section/user-section/user-section.component';
import { authenticationGuard } from './guard/authentication.guard';
import { authorizationGuard } from './guard/authorization.guard';
import { HomeComponent } from './authenticated_section/user-section/home/home.component';

const routes: Routes = [
  { path: "", component: HomeUnauthenticatedComponent },
  {
    path: "", component: UserSectionComponent, canActivate: [authenticationGuard, authorizationGuard], children: [
      { path: "home", component: HomeComponent },
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
