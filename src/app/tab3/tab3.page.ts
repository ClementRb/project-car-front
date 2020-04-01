import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { Storage } from "@ionic/storage";
import { HTTP } from "@ionic-native/http/ngx";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { GarageService } from "src/app/services/garage/garage.service";
import { AddCarPage } from "src/app/Modal/add-car/add-car.page";
import { CreateCarPage } from "src/app/Modal/create-car/create-car.page";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  constructor(
    private userService: UserService,
    private storage: Storage,
    private http: HTTP,
    private router: Router,
    private authenticationService: AuthenticationService,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public garage: GarageService,
    public modalController: ModalController
  ) {}

  user: any = {};
  garages = [];
  garageToModify = null;
  expanded = null;
  carsOfGarage = null;

  ngOnInit() {
    this.storage.get("USER_INFO").then(userInfo => {
      const userJson = JSON.parse(userInfo);
      this.user = userJson.user;
      console.log(this.user);
      this.getGarage();
    });
  }

  expand(garageId) {
    console.log(garageId);
    if (this.expanded === garageId) {
      this.expanded = null;
    } else {
      this.expanded = garageId;
    }
    this.garage.getCars(garageId).then(data => {
      console.log(data);
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: "Logout",
          cssClass: "importantOption",
          handler: () => {
            this.logout();
          }
        },
        {
          text: "New car",
          cssClass: "basicOption",
          handler: () => {
            this.presentModalCreateCar();
          }
        },
        {
          text: "New garage",
          cssClass: "basicOption",
          handler: () => {
            this.presentAlertPrompt();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "importantOption",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: "Create a new garage !",
      cssClass: "basicAlert",
      inputs: [
        {
          name: "Name",
          type: "text",
          cssClass: "basicInput",
          placeholder: "Name of the garage"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: data => {
            this.createGarage(data.Name);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal(garageId) {
    const modal = await this.modalController.create({
      component: AddCarPage,
      componentProps: {
        garageId: garageId
      }
    });
    return await modal.present();
  }

  async presentModalCreateCar() {
    const modal = await this.modalController.create({
      component: CreateCarPage
    });
    return await modal.present();
  }

  createGarage(name) {
    console.log(name);
    this.garage.postGarage(this.user.id, name).then(data => {
      console.log(data);
      this.getGarage();
    });
  }

  getGarage() {
    const userId = this.user.id.toString();
    this.garage.getGarage(userId).then(data => {
      console.log(data);
      const newData: any = data;
      this.garages = JSON.parse(newData);
    });
  }

  doRefresh(event) {
    console.log("Begin async operation");

    this.getGarage();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  logout() {
    this.authenticationService.logout();
  }
}
