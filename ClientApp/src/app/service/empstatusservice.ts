import {Empstatus} from "../entity/empstatus";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Empstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Empstatus>> {

    const empstatuses = await this.http.get<Array<Empstatus>>('http://localhost:8080/empstatuses/list').toPromise();
    if(empstatuses == undefined){
      return [];
    }
    return empstatuses;
  }

}


