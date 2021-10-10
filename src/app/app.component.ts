import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public navigation = [
    {
      "text": "Shop",
      "icon": "home",
      "link": "/"
    },
    {
      "text": "Cart",
      "icon": "cart",
      "link": "/cart"
    },
    {
      "text": "Contact",
      "icon": "paper-plane",
      "link": "/hello"
    }
  ];
  public title = "My Store";
  public menuFooter = `© Copyright ${new Date().getFullYear()} ${this.title}, all rights reserved.`;
  public cartItems = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController:AlertController,
    private updates: SwUpdate
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.updates.available.subscribe(event => {
      this.presentUpdateAlert();
    });
  }

  async presentUpdateAlert() {
    const alert = await this.alertController.create({
      header: 'Update',
      subHeader: 'A New Version is Available',
      message: 'There is a new version available that will now be installed.',
      buttons: ['OK']
    });
    await alert.present();
    alert.onDidDismiss().then(() => this.updates.activateUpdate().then(() => document.location.reload()));
  }

  gotoFacebook() {
    window.location.assign("https://facebook.com/");
  }

  gotoInstagram() {
    window.location.assign("https://instagram.com/");
  }
}
