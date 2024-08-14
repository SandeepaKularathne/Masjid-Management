import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Payment} from "../entity/payment";

@Injectable({
  providedIn: 'root'
})

export class Paymentservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Payment>> {

    const payments = await this.http.get<Array<Payment>>('http://localhost:8080/payments/list').toPromise();
    if(payments == undefined){
      return [];
    }
    return payments;
  }

}


