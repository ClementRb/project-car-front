import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then(m => m.TabsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: "register",
    loadChildren: "./auth/register/register.module#RegisterPageModule"
  },
  {
    path: "login",
    loadChildren: "./auth/login/login.module#LoginPageModule"
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
