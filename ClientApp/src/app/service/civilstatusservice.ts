import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Civilstatus} from "../entity/civilstatus";

@Injectable({
  providedIn: 'root'
})

export class Civilstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Civilstatus>> {

    const civilstatuses = await this.http.get<Array<Civilstatus>>('http://localhost:8080/civilstatuses/list').toPromise();
    if(civilstatuses == undefined){
      return [];
    }
    return civilstatuses;
  }

}


