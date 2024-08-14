import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Trustee} from "../entity/trustee";
import {City} from "../entity/city";
import {District} from "../entity/district";

@Injectable({
  providedIn: 'root'
})

export class Districtservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<District>> {

    const districs = await this.http.get<Array<District>>('http://localhost:8080/districts/list').toPromise();
    if(districs == undefined){
      return [];
    }
    return districs;
  }

}


