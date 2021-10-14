import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  ngOnInit() {
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

}
