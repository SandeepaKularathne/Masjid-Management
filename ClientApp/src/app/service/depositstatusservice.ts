import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Depositstatus} from "../entity/depositstatus";

@Injectable({
  providedIn: 'root'
})

export class Depositstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Depositstatus>> {

    const depositstatuses = await this.http.get<Array<Depositstatus>>('http://localhost:8080/depositstatuses/list').toPromise();
    if(depositstatuses == undefined){
      return [];
    }
    return depositstatuses;
  }

}


