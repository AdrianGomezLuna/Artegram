import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

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

  loginUser = {
    email: 'adri@gmail.com',
    password: '123456'
  };

  constructor( private usuarioService: UsuarioService, private navController: NavController, private uiService: UiServiceService) { }

  ngOnInit() {}

  //Bloqueo el slide para movernos manualmente
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  //Login de la aplicación
  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    //Devuelve una promesa, devolverá TRUE o FALSE
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valido) {
      //colocamos la ruta que aparece en app.routing.ts
      this.navController.navigateRoot('/main/tabs/tab1',{animated: true});
    }else{
      //mostrar alerta de lo ocurrido
      this.uiService.alertaInformativa('Usuario y/o contraseña no son correctos');
    }
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
