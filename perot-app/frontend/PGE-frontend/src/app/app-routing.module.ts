import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './progress/progress.component'; 
import { QrscanComponent } from './qrscan/qrscan.component';
import { ExitComponent } from './exit/exit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
 {path: 'progress', component: ProgressComponent},
 {path: 'qrscan', component: QrscanComponent},
 {path: 'exit', component: ExitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
