import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";

@Injectable({
  providedIn: 'root'
})

export class Msjstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Msjstatus>> {

    const msjstatuses = await this.http.get<Array<Msjstatus>>('http://localhost:8080/msjstatuses/list').toPromise();
    if(msjstatuses == undefined){
      return [];
    }
    return msjstatuses;
  }

}


