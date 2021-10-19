import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = null;
  private usuario: Usuario;
  private storages: Storage;

  constructor(private http: HttpClient, private storage: Storage, private navController: NavController) {
    this.init();
   }

   async init(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storages = storage;
  }

  //Para loguear en la app
  login( email: string, password: string){
    const data = { email, password };

    return new Promise( resolve => {
        this.http.post(`${URL}/user/login`, data).subscribe( resp => {
        console.log(resp);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (resp['ok']) {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.guardarToken(resp['token']);
          resolve(true);
        } else{
          this.token = null;
          // this.storages.clear();
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  //Para registrar un usuario
  registro(usuario: Usuario) {
    return new Promise( resolve => {
      this.http.post(`${URL}/user/create`, usuario).subscribe(resp => {
        console.log(resp);
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (resp['ok']) {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.guardarToken(resp['token']);
          resolve(true);
        } else{
          this.token = null;
          // this.storages.clear();
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    // eslint-disable-next-line no-underscore-dangle
    if (!this.usuario._id) {
      this.validarToken();
    }
    // return{...this.usuario};
    return this.usuario;
  }

  //Promesa, que se espera hasta que se guarde el token en el storage
  async guardarToken( token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  //Cargar el token del usuario guardado
  async cargarToken() {
    this.token = await this.storage.get('token') || null;
    console.log('token:',this.token);
  }


  //Comprueba que exista el token mediante una promesa tipo boolean
  async validarToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, {headers}).subscribe( resp => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (resp['ok']) {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  actualizarUsuario(usuario: Usuario) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
        this.http.post(`${URL}/user/update`, usuario, {headers}).subscribe( resp => {

          // eslint-disable-next-line @typescript-eslint/dot-notation
        if (resp['ok']) {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
