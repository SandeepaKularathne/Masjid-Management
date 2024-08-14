import {Housesstate} from "../entity/housesstate";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class Housesstateservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Housesstate>> {

    const housesstatees = await this.http.get<Array<Housesstate>>('http://localhost:8080/housesstatees/list').toPromise();
    if(housesstatees == undefined){
      return [];
    }
    return housesstatees;
  }

}


