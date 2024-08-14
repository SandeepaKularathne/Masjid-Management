import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Trustee} from "../entity/trustee";
import {City} from "../entity/city";

@Injectable({
  providedIn: 'root'
})

export class Cityservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<City>> {

    const cities = await this.http.get<Array<City>>('http://localhost:8080/cities/list').toPromise();
    if(cities == undefined){
      return [];
    }
    return cities;
  }

}


