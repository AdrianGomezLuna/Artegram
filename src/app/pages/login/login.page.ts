import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal',{static:false}) slides: IonSlides;

  //Avatares que tenemos para poder elegir
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  // Conseguir que los avatares de selección estén más juntos
  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit() {}

  //Bloqueo el slide para movernos manualmente
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  //Login de la aplicación
  login(fLogin: NgForm) {
    console.log(fLogin.valid);

  }

  //Registro de la aplicación
  registro(fRegistro: NgForm){
    console.log(fRegistro.valid);
  }

  //Cambiamos todos los avatares la selección a false y luego el que hemos seleccionado lo ponemos en true
  seleccionarAvatar(avatar){
    this.avatars.forEach( av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

  //Moverse en los diferentes slides
  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
