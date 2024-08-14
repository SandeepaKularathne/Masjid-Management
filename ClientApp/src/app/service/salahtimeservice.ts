import {Salahtime} from "../entity/salahtime";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class SalahtimeService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/salahtimes/' + id).toPromise();
  }


  async getAll(query:string): Promise<Array<Salahtime>> {
    const salahtimes = await this.http.get<Array<Salahtime>>('http://localhost:8080/salahtimes'+query).toPromise();
    if(salahtimes == undefined){
      return [];
    }
    return salahtimes;
  }

  async add(salahtime: Salahtime): Promise<[]|undefined>{
    return this.http.post<[]>('http://localhost:8080/salahtimes', salahtime).toPromise();
  }

}


