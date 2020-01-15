import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user/user.service";
import { CarService } from "src/app/services/car/car.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(
    private authenticationService: AuthenticationService,
    private user: UserService,
    private car: CarService
  ) {}

  userId = null;
  modelId = null;
  brandId = null;
  subModelId = null;
  cars = []

  ngOnInit() {
    this.car
      .getCars(this.userId, this.brandId, this.modelId, this.subModelId)
      .then(data => {
        this.cars = JSON.parse(data)
        console.log(this.cars);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.authenticationService.logout();
  }
}
