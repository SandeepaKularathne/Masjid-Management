import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Receivecategory} from "../entity/receivecategory";

@Injectable({
  providedIn: 'root'
})

export class Receivecategoryservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Receivecategory>> {

    const receivecategorys = await this.http.get<Array<Receivecategory>>('http://localhost:8080/receivecategorys/list').toPromise();
    if(receivecategorys == undefined){
      return [];
    }
    return receivecategorys;
  }

}


