import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagens'
})
export class ImagensPipe implements PipeTransform {

  transform(img: string, userId: string): string {
    return `${URL}/posts/imagen/${userId}/${img}`;
  }

}
