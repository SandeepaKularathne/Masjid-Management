import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account} from "../entity/account";

@Injectable({
  providedIn: 'root'
})

export class Accountservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Account>> {

    const accounts = await this.http.get<Array<Account>>('http://localhost:8080/accounts/list').toPromise();
    if(accounts == undefined){
      return [];
    }
    return accounts;
  }

}


