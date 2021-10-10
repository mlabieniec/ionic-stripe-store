import { Injectable } from '@angular/core';
import Cache from '@aws-amplify/cache';
import { Subject, Observable } from 'rxjs';


Cache.configure({
  keyPrefix: "plume-"
});

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _addItem: Subject<any> = new Subject<any>();
  public addToCartListener: Observable<any> = this._addItem.asObservable();
  private _removeItem: Subject<any> = new Subject<any>();
  public removeFromCartListener: Observable<any> = this._removeItem.asObservable();

  public keys = [];
  public offers = [];

  constructor() { }

  public async add(offer: any) {
    Cache.setItem(offer.id, offer);
    this._addItem.next(offer);
  }

  public async remove(offer: any) {
    Cache.removeItem(offer.id);
    this._removeItem.next(offer);
  }

  public list(): Array<any> {
    this.offers = [];
    const keys: any = Cache.getAllKeys();
    this.keys = keys;
    keys.forEach((k: any) => {
      this.offers.push(Cache.getItem(k));
    });
    return this.offers;
  }

  public isInCart(offer: any): boolean {
    if (!offer) return false;
    return Cache.getItem(offer.id) ? true : false;
  }
}
