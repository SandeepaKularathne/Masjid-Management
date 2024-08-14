import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Memberstatus} from "../entity/memberstatus";

@Injectable({
  providedIn: 'root'
})

export class Memberstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Memberstatus>> {

    const memberstatuses = await this.http.get<Array<Memberstatus>>('http://localhost:8080/memberstatuses/list').toPromise();
    if(memberstatuses == undefined){
      return [];
    }
    return memberstatuses;
  }

}


