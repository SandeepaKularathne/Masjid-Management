import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Receivestatus} from "../entity/receivestatus";

@Injectable({
  providedIn: 'root'
})

export class Receivestatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Receivestatus>> {

    const receivestatuses = await this.http.get<Array<Receivestatus>>('http://localhost:8080/receivestatuses/list').toPromise();
    if(receivestatuses == undefined){
      return [];
    }
    return receivestatuses;
  }

}


