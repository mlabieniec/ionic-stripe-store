import { Component, Input, OnInit } from '@angular/core';
import { StripeService } from '../stripe.service';
import { CartService } from './cart.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  error = "";
  items = [];
  @Input()
  isModal:boolean;

  constructor(
    private stripe:StripeService,
    private cart:CartService,
    private alert:AlertController,
    private loading:LoadingController,
    private modal:ModalController
    ) { 
      this.cart.addToCartListener.subscribe(() => this.getProducts());
    }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.items = this.cart.list();
  }

  closeModal() {
    this.modal.dismiss();
  }

  async checkout() {
    const loading = await this.loading.create({
      message: 'Please wait...',
      backdropDismiss: true,
      duration: 5000
    });
    loading.present();
    try {
      let result = await this.stripe.checkout(this.items); 
      //console.log(result);
      if (result.error && result.error.message) {
        this.alert.create({
          message: result.error.message
        });
      }
    } catch (error) {
      console.log(error);
      this.alert.create({
        message: error.message
      });
    }
    loading.dismiss();
  }

  async remove(product) {
    this.cart.remove(product);
    this.getProducts();
  }

}
