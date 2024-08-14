import {House} from "../entity/house";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class HouseService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/houses/' + id).toPromise();
  }

  async update(house: House): Promise<[]|undefined>{
    //console.log("House Updating-"+house.id);
    return this.http.put<[]>('http://localhost:8080/houses', house).toPromise();
  }


  async getAll(query:string): Promise<Array<House>> {
    const houses = await this.http.get<Array<House>>('http://localhost:8080/houses'+query).toPromise();
    if(houses == undefined){
      return [];
    }
    return houses;
  }

    // async getAllListNameId(): Promise<Array<House>> {
    //
    // const houses = await this.http.get<Array<House>>('http://localhost:8080/houses/list').toPromise();
    // if(houses == undefined){
    //   return [];
    // }
    // return houses;
  // }

  async add(house: House): Promise<[]|undefined>{
    //console.log("House Adding-"+JSON.stringify(house));
    //house.number="47457";
    return this.http.post<[]>('http://localhost:8080/houses', house).toPromise();
  }

}


