import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { EnvService } from "../env.service";
import { AlertService } from "../alert.service";
import { Storage } from "@ionic/storage";
import { AuthenticationService } from "src/app/services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class GarageService {
  constructor(
    private http: HTTP,
    private ENV: EnvService,
    private alert: AlertService,
    private storage: Storage,
    private authenticationService: AuthenticationService
  ) {}

  getGarage(userId) {
    console.log(userId);
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .get(this.ENV.API_URL + "/api/garage", { userId: userId }, {})
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

  postGarage(userId, name) {
    console.log("ici");
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .post(
          this.ENV.API_URL + "/api/garage",
          { User: userId, Name: name },
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

  addCar(garageId, carId) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http.post(
        this.ENV.API_URL + `/api/garage/car/${carId}`,
        { garage_id: garageId },
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
