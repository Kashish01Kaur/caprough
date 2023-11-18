import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }
    
    userLogin(user: any): Observable<any> {
        return this.http.post<any>('https://localhost:7086/api/Users/login', user);
    }

    userRegister(user: any): Observable<any> {
        return this.http.post<any>('https://localhost:7086/api/Users/register', user);
    }

    getPackages(page :number): Observable<any> {
        return this.http.get<any>(`https://localhost:7086/api/Packages?page=${page}`);
    }

    getPackagesBySearch(packages: any): Observable<any> {
        return this.http.get<any>('https://localhost:7086/api/Packages/search?q=' + packages);
    }
    getPackagesById(id:any):Observable<any>{
        return this.http.get<any>(`https://localhost:7086/api/Packages/${id}`);
    }
    addToItinerary(userId:string, product: any[]):Observable<any>{
        return this.http.post<any>(`https://localhost:7086/api/Users/${userId}/itinerary`, product);
      }
      
      displayItinerary(userId:string) : Observable<any>{
        return this.http.get<any>(` https://localhost:7086/api/Users/${userId}/itinerary`)
      }
      deleteHotelId(userId:string,hotelId:string) : Observable<any>{
        return this.http.delete(`https://localhost:7086/api/Users/${userId}/accommodations/${hotelId}`)
      }
}