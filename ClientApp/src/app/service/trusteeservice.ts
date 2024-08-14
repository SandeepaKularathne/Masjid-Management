import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Trustee} from "../entity/trustee";

@Injectable({
  providedIn: 'root'
})

export class Trusteeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Trustee>> {

    const trustees = await this.http.get<Array<Trustee>>('http://localhost:8080/trustees/list').toPromise();
    if(trustees == undefined){
      return [];
    }
    return trustees;
  }

}


