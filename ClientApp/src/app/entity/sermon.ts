import {Gender} from "./gender";
import {Designation} from "./designation";
import {Empstatus} from "./empstatus";
import {Emptype} from "./emptype";
import {Masjid} from "./masjid";
import {Civilstatus} from "./civilstatus";
import {Memberstatus} from "./memberstatus";
import {Jobstatus} from "./jobstatus";
import {Membertype} from "./membertype";
import {House} from "./house";
import {Employee} from "./employee";
import {Sermonstatus} from "./sermonstatus";
import {Member} from "./member";
import {end, start} from "@popperjs/core";
import {Moulavi} from "./moulavi";

export class Sermon{

  public id !: number;
  public date !: string;
  public masjid !:Masjid;
  public moulavi !:Moulavi;
  public sermonstatus !: Sermonstatus;
  public description !: string;
  public start !: string;
  public end !: string;
  public employee !:Employee;
  public dateupdate !:string;


  constructor(id: number, date: string, masjid: Masjid, moulavi: Moulavi, sermonstatus: Sermonstatus, description: string, start: string, end: string, employee: Employee, dateupdate: string) {
    this.id = id;
    this.date = date;
    this.masjid = masjid;
    this.moulavi = moulavi;
    this.sermonstatus = sermonstatus;
    this.description = description;
    this.start = start;
    this.end = end;
    this.employee = employee;
    this.dateupdate = dateupdate;
  }
}





