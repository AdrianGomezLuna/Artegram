import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagensPipe } from './imagens.pipe';



@NgModule({
  declarations: [
    ImagensPipe
  ],
  exports: [
    ImagensPipe
  ]
})
export class PipesModule { }
