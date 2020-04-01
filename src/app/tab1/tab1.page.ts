import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user/user.service";
import { CarService } from "src/app/services/car/car.service";
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private user: UserService,
    private car: CarService,
    private storage: Storage,
    private http: HTTP
  ) {}

  userId = null;
  modelId = null;
  brandId = null;
  subModelId = null;
  cars = [];
  token: string = null;

  ngOnInit() {
    console.log("init");
    this.storage.get("TOKEN_KEY").then(token => {
      this.token = token;
      this.http.setHeader("*", "Authorization", `${token}`);
      this.getCars();
    });
  }

  logout() {
    this.authenticationService.logout();
  }

  getCars() {
    this.car
      .getCars(this.userId, this.brandId, this.modelId, this.subModelId)
      .then(data => {
        const newData: any = data;
        this.cars = JSON.parse(newData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  doRefresh(event) {
    console.log("Begin async operation");

    this.getCars();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }
}
