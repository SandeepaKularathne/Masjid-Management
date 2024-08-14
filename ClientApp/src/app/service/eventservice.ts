import {Event} from "../entity/event";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: HttpClient) {  }

  async delete(id: number): Promise<[]|undefined>{
    // @ts-ignore
    return this.http.delete('http://localhost:8080/events/' + id).toPromise();
  }

  async update(event: Event): Promise<[]|undefined>{
    //console.log("Event Updating-"+event.id);
    return this.http.put<[]>('http://localhost:8080/events', event).toPromise();
  }


  async getAll(query:string): Promise<Array<Event>> {
    const events = await this.http.get<Array<Event>>('http://localhost:8080/events'+query).toPromise();
    if(events == undefined){
      return [];
    }
    return events;
  }

  async getAllListNameId(): Promise<Array<Event>> {

    const events = await this.http.get<Array<Event>>('http://localhost:8080/events/list').toPromise();
    if(events == undefined){
      return [];
    }
    return events;
  }

  async add(event: Event): Promise<[]|undefined>{
    //console.log("Event Adding-"+JSON.stringify(event));
    //event.number="47457";
    return this.http.post<[]>('http://localhost:8080/events', event).toPromise();
  }

}


