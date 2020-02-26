import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  color = null;

  constructor(private toastController: ToastController) {}
  async presentToast(message: any, state) {
    if (state) {
      this.color = 'success';
    } else {
      this.color = 'primary';
    }
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: this.color
    });
    toast.present();
  }
}
