import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  itineraryItems: any[] = [];
  userId = '';
  totalBudget: any;
  private map!: L.Map;
  private centroid: L.LatLngExpression = [17.3850, 78.4867];

  constructor(private api: ApiService) { }

  private initMap(): void {
    // Loop through the itineraryItems and get the coordinates for each one
    const validCoordinates: Array<number[]> = [];
    this.itineraryItems.forEach(item => {
      const coord = item.hotelLocation.coordinates;
      if (!isNaN(parseFloat(coord[0])) && !isNaN(parseFloat(coord[1]))){
        validCoordinates.push(coord);
      }
    });
    const coordinates = validCoordinates.length > 0 ? validCoordinates : [[17.3850, 78.4867]];

    // Set the centroid to the average of all coordinates
    this.centroid = [coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length,
                     coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length];

    this.map = L.map('map', {
      zoom: 12
    });
    this.map.setView(this.centroid, 12);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 10,
        attribution:
          '&copy;<a href="http://www.openstreetmap.org">OpenStreetMap</a>'
      }
    );

    // Add the base tile layer to the map
    tiles.addTo(this.map);
    const defaultIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    // Loop through the itineraryItems and create markers for each one
    for (const item of this.itineraryItems) {
      const latlng = item.hotelLocation.coordinates;
      if (!isNaN(parseFloat(latlng[0])) && !isNaN(parseFloat(latlng[1]))) {
        
        var marker = L.marker(latlng, { icon: defaultIcon }).addTo(this.map).bindPopup(`<strong>${item.hotelName}</strong>`);
        marker.bindPopup(`<strong>${item.hotelName}`);
      }
    }
  }

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.userId = userObject.userId;
    }
    this.api.displayItinerary(this.userId).subscribe((data: any) => {
      this.itineraryItems = data;
      console.log( this.itineraryItems);
      this.initMap();
    });
  }

  onDelete(hotelId:string){
    this.api.deleteHotelId(this.userId,hotelId)
    .subscribe(
      response=>{
        console.log(response);        
      },
      error=>{
        console.log(error);
      }
    );
    }
  }
