import { Component, OnInit, Input } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { CarService } from "src/app/services/car/car.service";
import { Storage } from "@ionic/storage";
import { ModalController } from "@ionic/angular";
import { GarageService } from "src/app/services/garage/garage.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.page.html",
  styleUrls: ["./add-car.page.scss"]
})
export class AddCarPage implements OnInit {
  constructor(
    navParams: NavParams,
    private car: CarService,
    private storage: Storage,
    public modalController: ModalController,
    public garage: GarageService,
    public alert: AlertService
  ) {
    console.log(navParams.get("garageId"));
    this.garageId = navParams.get("garageId");
  }

  garageId = null;
  userId = null;
  modelId = null;
  brandId = null;
  subModelId = null;
  cars = [];
  token: string = null;
  user = null;
  selectedCar = null;

  ngOnInit() {
    this.storage.get("USER_INFO").then(userInfo => {
      const userJson = JSON.parse(userInfo);
      this.user = userJson.user;
      this.userId = this.user.id;
      this.getCars();
    });
  }

  getCars() {
    this.car
      .getCars(this.userId, this.brandId, this.modelId, this.subModelId)
      .then(data => {
        const newData: any = data;
        this.cars = JSON.parse(newData);
        console.log(this.cars);
      })
      .catch(error => {
        console.log(error);
      });
  }

  radioGroupChange(event) {
    this.selectedCar = event.detail.value;
  }

  addCarToGarage() {
    const idGarage = this.garageId.toString();
    const idCar = this.selectedCar.toString();
    this.garage.addCar(idGarage, idCar).then(data => {
      this.dismiss();
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
