import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.scss']
})
export class AccommodationsComponent {
  mypackageId: any;
  item: any; // define item property here
  myAccomodation: any[] = [];
  Id: any;

  myItem: any;
  constructor(private route: ActivatedRoute, private packages: ApiService) {
  }

  ngOnInit() {
    this.mypackageId = this.route.snapshot.params['packageId'];
  
    this.packages.getPackagesById(this.mypackageId).subscribe((res) => {
      this.myAccomodation = res.accommodations;
      console.log(this.myAccomodation);
      
      for (let item of this.myAccomodation) {
        this.myItem = item;
        console.log(item);
      }
    });
  
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      const userObject = JSON.parse(userJson);
      this.Id = userObject.userId;
      console.log(this.Id);
    }
  }
  
  addToItinerary(){
    this.packages.addToItinerary(this.Id, this.myItem)
      .subscribe(
        response => {
          console.log(response);
          alert('Accomodation added to Itinerary');
        },
      );
  }
}
