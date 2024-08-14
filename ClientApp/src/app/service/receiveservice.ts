import {Receive} from "../entity/receive";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Gender} from "../entity/gender";

@Injectable({
  providedIn: 'root'
})

export class ReceiveService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/receives/' + id).toPromise();
  }

  async update(receive: Receive): Promise<[]|undefined>{
    //console.log("Receive Updating-"+receive.id);
    return this.http.put<[]>('http://localhost:8080/receives', receive).toPromise();
  }


  async getAll(query:string): Promise<Array<Receive>> {
    const receives = await this.http.get<Array<Receive>>('http://localhost:8080/receives'+query).toPromise();
    if(receives == undefined){
      return [];
    }
    return receives;
  }

  async getAllListNameId(): Promise<Array<Receive>> {

    const receives = await this.http.get<Array<Receive>>('http://localhost:8080/receives/list').toPromise();
    if(receives == undefined){
      return [];
    }
    return receives;
  }

  async add(receive: Receive): Promise<[]|undefined>{
    //console.log("Receive Adding-"+JSON.stringify(receive));
    //receive.number="47457";
    return this.http.post<[]>('http://localhost:8080/receives', receive).toPromise();
  }

}


