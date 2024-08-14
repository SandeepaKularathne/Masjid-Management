import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Trustee} from "../entity/trustee";
import {City} from "../entity/city";
import {District} from "../entity/district";
import {Province} from "../entity/province";

@Injectable({
  providedIn: 'root'
})

export class Provinceservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Province>> {

    const provinces = await this.http.get<Array<Province>>('http://localhost:8080/provinces/list').toPromise();
    if(provinces == undefined){
      return [];
    }
    return provinces;
  }

}


