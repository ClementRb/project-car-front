import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { EnvService } from "../env.service";
import { AlertService } from "../alert.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HTTP,
    private ENV: EnvService,
    private alert: AlertService
  ) {}

  login(username, password) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .post(
          this.ENV.API_URL + "/api/auth/login",
          { username: username, password: password },
          {}
        )
        .then(response => {
          const message = "Successfully logged in";
          this.alert.presentToast(message, true);
          resolve(response.data);
        })
        .catch(response => {
          const message = response.error;
          this.alert.presentToast(message, false);
        });
    });
  }

  register(username, email, password) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .post(
          this.ENV.API_URL + "/api/auth/register",
          { username: username, email: email, password: password },
          {}
        )
        .then(response => {
          const message = "Successfully registered";
          this.alert.presentToast(message, true);
          resolve(response.data);
        })
        .catch(response => {
          const message = JSON.parse(response.error);
          this.alert.presentToast(message.message, false);
        });
    });
  }

  getUserInfos(username) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .get(this.ENV.API_URL + "/api/user", { username: username }, {})
        .then(response => {
          resolve(response.data);
        });
    });
  }
}
