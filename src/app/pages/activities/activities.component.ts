import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {
mypackageId:any;
item:any;
myActivities:any;
constructor(private route :ActivatedRoute,private packages:ApiService){

}
ngOnInit(){
  this.mypackageId=this.route.snapshot.params['packageId'];
  this.packages.getPackagesById(this.mypackageId).subscribe((res)=>{
    console.log(res);
     
    this.myActivities = res.activities;
    console.log(this.myActivities);
  })
}
}
