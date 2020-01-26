import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, LoginComponent} from '@auth/index';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    // TODO:
    // component: LayoutComponent,
    // children: [
    //   {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
    // ],
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
