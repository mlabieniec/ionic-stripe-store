import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment as env } from 'src/environments/environment';
import API from '@aws-amplify/api-rest';

export interface Product {
  active: boolean
  attributes: Array<any>
  created: number
  description: string
  id: string
  images: Array<string>
  livemode: boolean
  metadata: any
  name: string
  object: string
  package_dimensions: any
  shippable: any
  statement_descriptor: any
  tax_code: any
  type: string
  unit_label: any
  updated: number
  url: any
  price?: any
}

export const PRODUCT_TYPE_ONE_TIME = "one_time";
export const PRODUCT_TYPE_SUBSCRIBE = "subscription";

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  
  stripe:any;
  apiName = "plumeapi";

  constructor() { 
    this.init();
  }

  async init() {
    this.stripe = await loadStripe(env.stripe.publishableKey);
  }

  async checkout(products:any[]): Promise<any> {
    if (!products) return;
    let payload = [];
    products.forEach((product) => {
      payload.push({
        price_data: {
          currency: 'usd',
          product: product.id,
          unit_amount: product.price
        },
        quantity: 1
      });
    });
    let result:any = await API.post(this.apiName,'/checkout',{
      body: payload
    });
    if (result.id) {
      return this.stripe.redirectToCheckout({sessionId:result.id});
    } else {
      return result;
    }
  }

  async products(): Promise<any> {
    return await API.get(this.apiName, '/products', {});
  }
}
