import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { EnvService } from "../env.service";
import { AlertService } from "../alert.service";
import { Storage } from "@ionic/storage";
import { AuthenticationService } from "src/app/services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(
    private http: HTTP,
    private ENV: EnvService,
    private alert: AlertService,
    private storage: Storage,
    private authenticationService: AuthenticationService
  ) {}

  getCars(userId, brandId, modelId, subModelId) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .get(
          this.ENV.API_URL + "/api/cars",
          {
            userId: `${userId}`,
            brandId: `${brandId}`,
            modelId: `${modelId}`,
            subModelId: `${subModelId}`
          },
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

  createCar(userId, brandId, modelId, subModelId) {
    console.log(userId);
    console.log(brandId);
    console.log(modelId);
    console.log(subModelId);
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .post(
          this.ENV.API_URL + "/api/cars",
          {
            User: `${userId}`,
            Brand: `${brandId}`,
            Model: `${modelId}`,
            SubModel: `${subModelId}`
          },
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

  getBrands() {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .get(this.ENV.API_URL + "/api/brands", {}, {})
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          const message = response.error;
          this.alert.presentToast(message, false);
        });
    });
  }

  getModelsByBrand(brandId) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .get(this.ENV.API_URL + `/api/brands/${brandId}/models`, {}, {})
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          const message = response.error;
          this.alert.presentToast(message, false);
        });
    });
  }

  getSubModelsByModels(modelId) {
    this.http.setDataSerializer("json");
    return new Promise(resolve => {
      this.http
        .get(this.ENV.API_URL + `/api/model/${modelId}/submodels`, {}, {})
        .then(response => {
          resolve(response.data);
        })
        .catch(response => {
          const message = response.error;
          this.alert.presentToast(message, false);
        });
    });
  }
}
