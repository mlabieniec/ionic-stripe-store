import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CartIconComponent } from './cart/cart-icon/cart-icon.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomePage } from './home/home.page';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { CartPage } from './cart/cart.page';
import { StripePipe } from './stripe.pipe';
import { HelloPage } from './hello/hello.page';
import { HeroComponent } from './components/hero/hero.component';
import { ThanksComponent } from './thanks/thanks.component';

@NgModule({
  declarations: [
    AppComponent, 
    CartIconComponent, 
    AddtocartComponent,
    HomePage, 
    CartPage,
    HelloPage,
    HeroComponent,
    ThanksComponent,
    StripePipe
  ],
  entryComponents: [CartPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ServiceWorkerModule.register('ngsw-worker.js', 
    { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
