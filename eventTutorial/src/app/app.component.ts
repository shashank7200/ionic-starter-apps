import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


import firebase from 'firebase';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  zone: NgZone;

  constructor(platform: Platform) {

  var config = {
    apiKey: " ",
    authDomain: " ",
    databaseURL: " ",
    storageBucket: " ",
    messagingSenderId: " "
  };

  firebase.initializeApp(config);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

   this.zone = new NgZone({});
   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
   this.zone.run( () => {
    if (!user) {
      this.rootPage = LoginPage;
      unsubscribe();
    } else { 
      this.rootPage = HomePage; 
      unsubscribe();
    }
  });     
});

  }
}