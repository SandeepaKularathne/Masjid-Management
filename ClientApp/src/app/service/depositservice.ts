import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Deposit} from "../entity/deposit";

@Injectable({
  providedIn: 'root'
})

export class Depositservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Deposit>> {

    const deposits = await this.http.get<Array<Deposit>>('http://localhost:8080/deposits/list').toPromise();
    if(deposits == undefined){
      return [];
    }
    return deposits;
  }

}


