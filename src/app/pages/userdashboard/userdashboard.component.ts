import { Component } from '@angular/core';
import { ApiService } from 'src/shared/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-userdashboard',
    templateUrl: './userdashboard.component.html',
    styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent {
    title = 'PackageExplorer';
    myData: any[] = [];
    messages: number[] = Array(5).fill(0);
    currPage = 1; //paginator
    searchPackage!: FormGroup; //for form 

    constructor(private packages: ApiService, private fb: FormBuilder) {
        this.searchPackage = this.fb.group({
            searchTerm: ''
        });
        this.searchPackage.get('searchTerm')?.valueChanges.subscribe((value) => {
            if (value) {
                this.packages.getPackagesBySearch(value).subscribe((data: any) => {
                    console.log(data);
                    this.myData = data;
                });
            } else {
                this.getData();
            }
        });
    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
      this.packages.getPackages(this.currPage).subscribe({
        next: (data: any) => {
          console.log(data);
          this.myData = data;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
    

    prev(): void {
        if (this.currPage > 1) {
            this.currPage--;
            this.getData();
        }
    }

    next(): void {
        this.currPage++;
        this.getData();
    }
}