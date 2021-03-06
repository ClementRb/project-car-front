import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AddCarPage } from "./add-car.page";
import { CreateCarPage } from "../create-car/create-car.page";

const routes: Routes = [
  {
    path: "",
    component: AddCarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddCarPage, CreateCarPage]
})
export class AddCarPageModule {}
