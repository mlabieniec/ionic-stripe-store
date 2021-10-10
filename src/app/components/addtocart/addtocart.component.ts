import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { PRODUCT_TYPE_ONE_TIME, PRODUCT_TYPE_SUBSCRIBE } from 'src/app/stripe.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss'],
})
export class AddtocartComponent implements OnInit {

  @Input()
  product:any;

  @Output()
  add = new EventEmitter();

  inCart = false;

  constructor(private cart: CartService) { }

  ngOnInit() {
    this.refreshCart();
    this.cart.removeFromCartListener.subscribe(() => this.refreshCart());
  }

  refreshCart() {
    this.inCart = this.cart.isInCart(this.product);
  }

  addToCart() {
    if (this.product.price.type === PRODUCT_TYPE_ONE_TIME) {
      this.product.price = this.product.price.unit_amount;
    }
    this.cart.add(this.product);
  }

}
