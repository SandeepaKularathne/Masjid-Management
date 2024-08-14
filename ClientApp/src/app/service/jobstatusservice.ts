import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Jobstatus} from "../entity/jobstatus";

@Injectable({
  providedIn: 'root'
})

export class Jobstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Jobstatus>> {

    const jobstatuses = await this.http.get<Array<Jobstatus>>('http://localhost:8080/jobstatuses/list').toPromise();
    if(jobstatuses == undefined){
      return [];
    }
    return jobstatuses;
  }

}


