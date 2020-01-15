import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ToastController, Platform } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { EnvService } from "./env.service";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  TOKEN_KEY: any;

  constructor(
    private http: HTTP,
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private toastController: ToastController,
    private env: EnvService
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get("TOKEN_KEY").then(
      res => {
        if (res) {
          this.TOKEN_KEY = res;

          if (this.TOKEN_KEY != null) {
            this.authenticationState.next(true);
          } else {
            this.authenticationState.next(false);
          }
        }
      },
      error => {
        this.TOKEN_KEY = null;
        this.authenticationState.next(false);
      }
    );
  }

  logout() {
    this.storage.remove("TOKEN_KEY").then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
