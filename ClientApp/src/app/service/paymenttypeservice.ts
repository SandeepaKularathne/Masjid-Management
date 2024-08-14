import {Paymenttype} from "../entity/paymenttype";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Paymenttypeservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Paymenttype>> {

    const paymenttypes = await this.http.get<Array<Paymenttype>>('http://localhost:8080/paymenttypes/list').toPromise();
    if(paymenttypes == undefined){
      return [];
    }
    return paymenttypes;
  }

}


