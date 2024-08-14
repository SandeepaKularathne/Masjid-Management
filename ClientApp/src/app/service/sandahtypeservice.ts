import {Sandahtype} from "../entity/sandahtype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Sandahtypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Sandahtype>> {

    const sandahtypes = await this.http.get<Array<Sandahtype>>('http://localhost:8080/sandahtypes/list').toPromise();
    if(sandahtypes == undefined){
      return [];
    }
    return sandahtypes;
  }

}


