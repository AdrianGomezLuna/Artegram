import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  posts: Post[] = [];
  habilitar = true;

  constructor( private postService: PostsService) {}

  ngOnInit() {
    this.siguiente();
  }

  siguiente( event?, nuevo: boolean = false ) {

    this.postService.getPosts(nuevo).subscribe( resp => {
      console.log( resp );
      this.posts.push(...resp.posts); // cada entrada lo trata como un elemento nuevo

      //Controla el infinite Scroll
      if (event) {
        setTimeout(()=> {
          event.target.complete();
          if (resp.posts.length === 0) {
            this.habilitar = false;
          }
        }, 500);
      }
    });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  recargar( event) {
    this.siguiente(event, true);
    this.habilitar = true;
    //Borro toda la información para recargarla de nuevo
    this.posts = [];
  }

}
