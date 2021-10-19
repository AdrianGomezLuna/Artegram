import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSeleccionado = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';

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
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    for (const avatar of this.avatars) {
      if (avatar.img === this.avatarActual) {
        avatar.seleccionado = true;
        break;
      }
    }
  }

  //Cambiamos todos los avatares la selección a false y luego el que hemos seleccionado lo ponemos en true
  seleccionarAvatar(avatar){
    this.avatars.forEach( av => av.seleccionado = false);
    avatar.seleccionado = true;
    this.avatarSeleccionado.emit(avatar.img);
  }

}
