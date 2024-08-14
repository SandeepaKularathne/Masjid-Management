import {CountByDesignation} from "./entity/countbydesignation";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CountByMsjType} from "./entity/countbymsjtype";
import {CountByMsj} from "./entity/countbymsj";
import {CountByMsjCity} from "./entity/countbymsjcity";

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient) {  }

  async countByDesignation(): Promise<Array<CountByDesignation>> {

    const countbydesignations = await this.http.get<Array<CountByDesignation>>('http://localhost:8080/reports/countbydesignation').toPromise();
    if(countbydesignations == undefined){
      return [];
    }
    return countbydesignations;
  }

  async countByMsjType(): Promise<Array<CountByMsjType>> {

    const countbymsjtypes = await this.http.get<Array<CountByMsjType>>('http://localhost:8080/reports/countbymsjtype').toPromise();
    if(countbymsjtypes == undefined){
      return [];
    }
    return countbymsjtypes;
  }

  async countByMsj(): Promise<Array<CountByMsj>> {

    const countbymsjtypes = await this.http.get<Array<CountByMsj>>('http://localhost:8080/reports/countbymsj').toPromise();
    if(countbymsjtypes == undefined){
      return [];
    }
    return countbymsjtypes;
  }

  async countByMsjCity(): Promise<Array<CountByMsjCity>> {

    const countbymsjtypes = await this.http.get<Array<CountByMsjCity>>('http://localhost:8080/reports/countbymsjcity').toPromise();
    if(countbymsjtypes == undefined){
      return [];
    }
    return countbymsjtypes;
  }
}


