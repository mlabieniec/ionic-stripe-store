import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {

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
    this.cart.add(this.product);
  }

}
