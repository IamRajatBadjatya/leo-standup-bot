import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from './components/entry-page/entry-page.component';

const routes: Routes = [
  {
   path: '',
   component: EntryPageComponent,
  //  children: [
  //    { pathMatch: 'full', path: 'login', component: LoginComponent },
  //    { pathMatch: 'full', path: 'introduction', component: IntroductionComponent },
  //    { pathMatch: 'full', path: '', redirectTo: 'introduction' },
  //    { pathMatch: 'full', path: 'home-static', component: LoginComponent, canActivate: [AuthGuard] }
  //  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
