import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { EnvService } from "../env.service";
import { AlertService } from "../alert.service";

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(
    private http: HTTP,
    private ENV: EnvService,
    private alert: AlertService
  ) {}

  getCars(userId, brandId, modelId, subModelId) {
    return new Promise(resolve => {
      this.http
        .get(
          this.ENV.API_URL + "/api/cars",
          {},
          {}
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          console.log(response);
          const message = response.error;
          this.alert.presentToast(message, false);
        });
    });
  }
}
