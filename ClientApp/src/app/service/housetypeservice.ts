import {Housetype} from "../entity/housetype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Housetypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Housetype>> {

    const housetypes = await this.http.get<Array<Housetype>>('http://localhost:8080/housetypes/list').toPromise();
    if(housetypes == undefined){
      return [];
    }
    return housetypes;
  }

}


