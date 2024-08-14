import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Sermonstatus} from "../entity/sermonstatus";

@Injectable({
  providedIn: 'root'
})

export class Sermonstatusservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Sermonstatus>> {

    const sermonstatuses = await this.http.get<Array<Sermonstatus>>('http://localhost:8080/sermonstatuses/list').toPromise();
    if(sermonstatuses == undefined){
      return [];
    }
    return sermonstatuses;
  }

}


