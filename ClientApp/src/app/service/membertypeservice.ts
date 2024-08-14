import {Membertype} from "../entity/membertype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Membertypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Membertype>> {

    const membertypes = await this.http.get<Array<Membertype>>('http://localhost:8080/membertypes/list').toPromise();
    if(membertypes == undefined){
      return [];
    }
    return membertypes;
  }

}


