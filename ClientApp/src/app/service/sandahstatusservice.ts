import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Sandahstatus} from "../entity/sandahstatus";

@Injectable({
  providedIn: 'root'
})

export class Sandahstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Sandahstatus>> {

    const sandahstatuses = await this.http.get<Array<Sandahstatus>>('http://localhost:8080/sandahstatuses/list').toPromise();
    if(sandahstatuses == undefined){
      return [];
    }
    return sandahstatuses;
  }

}


