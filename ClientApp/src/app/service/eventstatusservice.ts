import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Eventstatus} from "../entity/eventstatus";

@Injectable({
  providedIn: 'root'
})

export class Eventstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Eventstatus>> {

    const eventstatuses = await this.http.get<Array<Eventstatus>>('http://localhost:8080/eventstatuses/list').toPromise();
    if(eventstatuses == undefined){
      return [];
    }
    return eventstatuses;
  }

}


