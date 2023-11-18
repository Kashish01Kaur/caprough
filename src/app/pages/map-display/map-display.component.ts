import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})
export class MapDisplayComponent implements OnInit{
@Input() from:PlaceSearchResult|undefined;
@Input() to:PlaceSearchResult|undefined;
  ngOnInit(): void {
    
  }
}
