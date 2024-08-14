import {Sandahmode} from "../entity/sandahmode";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Sandahmodeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Sandahmode>> {

    const sandahmodes = await this.http.get<Array<Sandahmode>>('http://localhost:8080/sandahmodes/list').toPromise();
    if(sandahmodes == undefined){
      return [];
    }
    return sandahmodes;
  }

}


