import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthGuardService } from "./services/auth-guard.service";
import { AuthenticationService } from "./services/authentication.service";

import { IonicStorageModule } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddCarPage } from "./Modal/add-car/add-car.page";
import { CreateCarPage } from "./Modal/create-car/create-car.page";

@NgModule({
  declarations: [AppComponent, AddCarPage, CreateCarPage],
  entryComponents: [AddCarPage, CreateCarPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: "__mydb",
      driverOrder: ["localstorage", "indexeddb", "websql"]
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuardService,
    AuthenticationService,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
