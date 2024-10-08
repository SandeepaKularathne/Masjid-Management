import {Empstatus} from "../entity/empstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Emptype} from "../entity/emptype";

@Injectable({
  providedIn: 'root'
})

export class Emptypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Emptype>> {

    const emptypes = await this.http.get<Array<Emptype>>('http://localhost:8080/empolyeestypes/list').toPromise();
    if(emptypes == undefined){
      return [];
    }
    return emptypes;
  }

}


