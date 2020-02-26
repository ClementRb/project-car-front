import { Component, OnInit, Input } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { CarService } from "src/app/services/car/car.service";

@Component({
  selector: "app-add-car",
  templateUrl: "./add-car.page.html",
  styleUrls: ["./add-car.page.scss"]
})
export class AddCarPage implements OnInit {
  constructor(navParams: NavParams, private car: CarService, private storage: Storage) {
    console.log(navParams.get("garageId"));
  }

  userId = null;
  modelId = null;
  brandId = null;
  subModelId = null;
  cars = [];
  token: string = null;
  user = null;

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
}
