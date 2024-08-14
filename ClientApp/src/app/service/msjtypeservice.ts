import {Msjtype} from "../entity/msjtype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Msjtypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Msjtype>> {

    const msjtypes = await this.http.get<Array<Msjtype>>('http://localhost:8080/msjtypes/list').toPromise();
    if(msjtypes == undefined){
      return [];
    }
    return msjtypes;
  }

}


