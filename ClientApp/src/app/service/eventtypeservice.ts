import {Empstatus} from "../entity/empstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Eventtype} from "../entity/eventtype";

@Injectable({
  providedIn: 'root'
})

export class Eventtypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Eventtype>> {

    const eventtypes   = await this.http.get<Array<Eventtype>>('http://localhost:8080/empolyeestypes/list').toPromise();
    if(eventtypes == undefined){
      return [];
    }
    return eventtypes;
  }

}


