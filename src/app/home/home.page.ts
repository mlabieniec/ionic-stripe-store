import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product, StripeService } from '../stripe.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  featuredProducts = [];
  constructor(
    private cart: CartService, 
    private stripe: StripeService) { }

  ngOnInit() {
    this.stripe.products()
      .then((items) => {
        this.featuredProducts = items.data;
      }).catch((error) => console.log(error));
  }

  getMainImage(product:Product) {
    if (!product || !product.images || product.images.length <= 0) return;
    return product.images[0];
  }

}
