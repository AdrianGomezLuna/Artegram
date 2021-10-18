import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal',{static:false}) slides: IonSlides;

  loginUser = {
    email: 'adri@gmail.com',
    password: '123456'
  };

  registroUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
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
      //colocamos la ruta que aparece en app.routing.ts para navegar al tab
      this.navController.navigateRoot('/main/tabs/tab1',{animated: true});
    }else{
      //mostrar alerta de lo ocurrido
      this.uiService.alertaInformativa('Usuario y/o contraseña no son correctos');
    }
  }

  //Registro de la aplicación
  async registro(fRegistro: NgForm){
    if (fRegistro.invalid) {  //Comprueba si el registro es válido
      return;
    }
    //Devuelve una promesa, devolverá TRUE o FALSE
    const valido = await this.usuarioService.registro(this.registroUser);
    if (valido) {
      //colocamos la ruta que aparece en app.routing.ts para navegar al tab
      this.navController.navigateRoot('/main/tabs/tab1',{animated: true});
    }else{
      //mostrar alerta de lo ocurrido
      this.uiService.alertaInformativa('Este correo electrónico ya existe');
    }
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
