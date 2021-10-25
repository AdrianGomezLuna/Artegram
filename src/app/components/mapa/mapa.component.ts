import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare const mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa',{ static: true }) mapa: any;

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    console.log(this.coords);
    mapboxgl.accessToken = 'pk.eyJ1Ijoia29ieWJsbiIsImEiOiJja3R1NHhkY2IxNnV4MnBxZWhoeDdlODEyIn0.R1EfwlWsarsu-xykMqtYRQ';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng,lat],
      zoom: 16
    });

    const marker = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map);
  }

}
