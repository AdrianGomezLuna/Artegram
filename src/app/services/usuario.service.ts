import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = null;
  private storages: Storage;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
   }

   async init(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storages = storage;
  }

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
          this.storages.clear();
          resolve(false);
        }
      });
    });

  }

  //Promesa, que se espera hasta que se guarde el token en el storage
  async guardarToken( token: string) {
    this.token = token;
    await this.storages.set('token', token);
  }
}
