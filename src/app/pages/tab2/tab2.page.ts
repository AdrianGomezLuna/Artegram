import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare const window: any;

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

  constructor( private postService: PostsService, private route: Router, private geolocation: Geolocation, private camera: Camera) {}

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

    // this.geolocation.getCurrentPosition().then((resp) => { Esta es la buena, la otra es prueba
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
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

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);

  }


  galeria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }


  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     //  let base64Image = 'data:image/jpeg;base64,' + imageData;
       const img = window.Ionic.WebView.convertFileSrc( imageData );
       console.log(img);

       this.tempImages.push( img);

     }, (err) => {
      // Handle error
     });
  }


}
