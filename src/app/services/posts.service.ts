import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  constructor( private http: HttpClient, private usuarioService: UsuarioService) { }

  getPosts(nuevo: boolean = false) {
    if (nuevo) {
      this.paginaPosts = 0;
    }
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
    //La URL lo coge de los enviroments
  }

  crearPost( post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    this.http.post(`${URL}/posts`,post,{headers}).subscribe( resp => {
      console.log(resp);
    });
  }
}
