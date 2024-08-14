import {Sermon} from "../entity/sermon";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class SermonService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/sermons/' + id).toPromise();
  }

  async update(sermon: Sermon): Promise<[]|undefined>{
    //console.log("Sermon Updating-"+sermon.id);
    return this.http.put<[]>('http://localhost:8080/sermons', sermon).toPromise();
  }


  async getAll(query:string): Promise<Array<Sermon>> {
    const sermons = await this.http.get<Array<Sermon>>('http://localhost:8080/sermons'+query).toPromise();
    if(sermons == undefined){
      return [];
    }
    return sermons;
  }

  // async getAllListNameId(): Promise<Array<Sermon>> {
  //
  //   const sermons = await this.http.get<Array<Sermon>>('http://localhost:8080/sermons/list').toPromise();
  //   if(sermons == undefined){
  //     return [];
  //   }
  //   return sermons;
  // }

  async add(sermon: Sermon): Promise<[]|undefined>{
    //console.log("Sermon Adding-"+JSON.stringify(sermon));
    //sermon.number="47457";
    return this.http.post<[]>('http://localhost:8080/sermons', sermon).toPromise();
  }

}


