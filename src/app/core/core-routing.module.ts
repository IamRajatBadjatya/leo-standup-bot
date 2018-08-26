import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { CreateStandupComponent } from './components/create-standup/create-standup.component';

const routes: Routes = [

  { pathMatch: 'full', path: 'create-standup', component: CreateStandupComponent },
  { path: '', pathMatch: 'full', component: EntryPageComponent},
  //    { pathMatch: 'full', path: 'introduction', component: IntroductionComponent },
  //    { pathMatch: 'full', path: '', redirectTo: 'introduction' },
  //    { pathMatch: 'full', path: 'home-static', component: LoginComponent, canActivate: [AuthGuard] }
  //  ]

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
