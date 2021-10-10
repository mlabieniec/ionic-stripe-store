import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart.page';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  @Input()
  public numItems = 0;

  constructor(private cartService: CartService, private modal:ModalController) { }

  ngOnInit() {
    this.numItems = this.cartService.list().length;
    this.cartService.addToCartListener.subscribe(
      (offer: any) => {
        this.numItems++;
      }
    );
    this.cartService.removeFromCartListener.subscribe(
      (offer: any) => {
        this.numItems--;
      }
    );
  }

  async showCart() {
    const modal = await this.modal.create({
      component: CartPage,
      componentProps: {
        'isModal': true
      }
    });
    return await modal.present();
  }

}
