import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Trustee} from "../entity/trustee";
import {City} from "../entity/city";
import {Rout} from "../entity/rout";

@Injectable({
  providedIn: 'root'
})

export class Routservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Rout>> {

    const districs = await this.http.get<Array<Rout>>('http://localhost:8080/routs/list').toPromise();
    if(districs == undefined){
      return [];
    }
    return districs;
  }

}


