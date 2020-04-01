import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { CarService } from "src/app/services/car/car.service";
import { Storage } from "@ionic/storage";
import { ModalController } from "@ionic/angular";
import { GarageService } from "src/app/services/garage/garage.service";
import { AlertService } from "src/app/services/alert.service";
@Component({
  selector: "app-create-car",
  templateUrl: "./create-car.page.html",
  styleUrls: ["./create-car.page.scss"]
})
export class CreateCarPage implements OnInit {
  constructor(
    navParams: NavParams,
    private car: CarService,
    private storage: Storage,
    public modalController: ModalController,
    public garage: GarageService,
    public alert: AlertService
  ) {}

  brands: any = null;
  models: any = null;
  submodels: any = null;
  userId = null;
  token: string = null;
  user = null;
  selectedBrand = null;
  selectedModel = null;
  selectedSubModel = null;

  ngOnInit() {
    this.storage.get("USER_INFO").then(userInfo => {
      const userJson = JSON.parse(userInfo);
      this.user = userJson.user;
      this.userId = this.user.id;
      this.getBrands();
    });
  }

  getBrands() {
    this.car.getBrands().then(data => {
      const newData: any = data;
      this.brands = [];
      this.brands = JSON.parse(newData);
      console.log(data);
    });
  }

  getModels(brandId) {
    this.models = null;
    this.submodels = null;
    this.selectedBrand = brandId.detail.value;
    this.car.getModelsByBrand(brandId.detail.value).then(data => {
      const newData: any = data;
      this.models = [];
      this.models = JSON.parse(newData);
      console.log(data);
    });
  }

  getSubModels(modelId) {
    this.selectedModel = modelId.detail.value;
    this.car.getSubModelsByModels(modelId.detail.value).then(data => {
      const newData: any = data;
      this.submodels = [];
      this.submodels = JSON.parse(newData);
      console.log(data);
    });
  }

  changeSubModel(submodelsId) {
    this.selectedSubModel = submodelsId.detail.value;
  }

  createCar() {
    this.car
      .createCar(
        this.userId,
        this.selectedBrand,
        this.selectedModel,
        this.selectedSubModel
      )
      .then(data => {
        console.log(data);
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
