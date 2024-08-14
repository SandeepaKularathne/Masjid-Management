import {Member} from "../entity/member";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Gender} from "../entity/gender";

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/members/' + id).toPromise();
  }

  async update(member: Member): Promise<[]|undefined>{
    //console.log("Member Updating-"+member.id);
    return this.http.put<[]>('http://localhost:8080/members', member).toPromise();
  }


  async getAll(query:string): Promise<Array<Member>> {
    const members = await this.http.get<Array<Member>>('http://localhost:8080/members'+query).toPromise();
    if(members == undefined){
      return [];
    }
    return members;
  }

  async getAllListNameId(): Promise<Array<Member>> {

    const members = await this.http.get<Array<Member>>('http://localhost:8080/members/list').toPromise();
    if(members == undefined){
      return [];
    }
    return members;
  }

  async add(member: Member): Promise<[]|undefined>{
    //console.log("Member Adding-"+JSON.stringify(member));
    //member.number="47457";
    return this.http.post<[]>('http://localhost:8080/members', member).toPromise();
  }

}


