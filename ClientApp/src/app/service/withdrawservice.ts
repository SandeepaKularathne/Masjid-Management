import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Withdraw} from "../entity/withdraw";

@Injectable({
  providedIn: 'root'
})

export class Withdrawservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Withdraw>> {

    const withdraws = await this.http.get<Array<Withdraw>>('http://localhost:8080/withdraws/list').toPromise();
    if(withdraws == undefined){
      return [];
    }
    return withdraws;
  }

}


