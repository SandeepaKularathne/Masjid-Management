  import {Masjid} from "../entity/masjid";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class MasjidService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/masjids/' + id).toPromise();
  }

  async update(masjid: Masjid): Promise<[]|undefined>{
    //console.log("Masjid Updating-"+masjid.id);
    return this.http.put<[]>('http://localhost:8080/masjids', masjid).toPromise();
  }


  async getAll(query:string): Promise<Array<Masjid>> {
    const masjids = await this.http.get<Array<Masjid>>('http://localhost:8080/masjids'+query).toPromise();
    if(masjids == undefined){
      return [];
    }
    return masjids;
  }

  async getAllListNameId(): Promise<Array<Masjid>> {

    const masjids = await this.http.get<Array<Masjid>>('http://localhost:8080/masjids/list').toPromise();
    if(masjids == undefined){
      return [];
    }
    return masjids;
  }

  async add(masjid: Masjid): Promise<[]|undefined>{
    //console.log("Masjid Adding-"+JSON.stringify(masjid));
    //masjid.number="47457";
    return this.http.post<[]>('http://localhost:8080/masjids', masjid).toPromise();
  }

}


