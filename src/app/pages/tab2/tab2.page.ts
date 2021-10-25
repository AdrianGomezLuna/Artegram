import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages = [];
  cargandoGeo = false;  //para saber si está buscando la Geolocalización

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor( private postService: PostsService, private route: Router, private geolocation: Geolocation) {}

  //Creo un post, purgo el post para que quede vacío y redirecciono al tab1
  async crearPost(){
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  //Obtiene la localización del usuario
  getGeo() {
    //Si no está buscando la localización
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    //Está buscando la localización
    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });

  }


}
