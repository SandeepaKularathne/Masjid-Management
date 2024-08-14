import {Sandah} from "../entity/sandah";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class SandahService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/sandahs/' + id).toPromise();
  }

  async update(sandah: Sandah): Promise<[]|undefined>{
    //console.log("Sandah Updating-"+sandah.id);
    return this.http.put<[]>('http://localhost:8080/sandahs', sandah).toPromise();
  }


  async getAll(query:string): Promise<Array<Sandah>> {
    const sandahs = await this.http.get<Array<Sandah>>('http://localhost:8080/sandahs'+query).toPromise();
    if(sandahs == undefined){
      return [];
    }
    return sandahs;
  }

  async getAllListNameId(): Promise<Array<Sandah>> {

    const sandahs = await this.http.get<Array<Sandah>>('http://localhost:8080/sandahs/list').toPromise();
    if(sandahs == undefined){
      return [];
    }
    return sandahs;
  }

  async add(sandah: Sandah): Promise<[]|undefined>{
    //console.log("Sandah Adding-"+JSON.stringify(sandah));
    //sandah.number="47457";
    return this.http.post<[]>('http://localhost:8080/sandahs', sandah).toPromise();
  }

}


