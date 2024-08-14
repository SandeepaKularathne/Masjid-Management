import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Msjstatus} from "../entity/msjstatus";
import {Moulavi} from "../entity/moulavi";

@Injectable({
  providedIn: 'root'
})

export class Moulaviservice {

  constructor(private http: HttpClient) {  }

  async getAllList(): Promise<Array<Moulavi>> {

    const moulavis = await this.http.get<Array<Moulavi>>('http://localhost:8080/moulavis/list').toPromise();
    if(moulavis == undefined){
      return [];
    }
    return moulavis;
  }

}


