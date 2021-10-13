import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  //Mantener los tamaños de las imágenes cuando se cambia la orientación móvil
  @ViewChild(IonSlides) slides: IonSlides;

  imag1 = '/assets/perro-1.jpg';
  imag2 = '/assets/perro-2.jpg';
  imag3 = '/assets/perro-3.jpg';

  constructor() { }

  //Mantener los tamaños de las imágenes cuando se cambia la orientación móvil
  @HostListener('window:resize') onResize(){
    setTimeout(() => this.slides.update(), 100);
  }

  ngOnInit() {}

}
