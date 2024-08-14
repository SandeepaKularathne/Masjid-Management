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
import {Eventstatus} from "./eventstatus";
import {Member} from "./member";
import {end, start} from "@popperjs/core";
import {Eventtype} from "./eventtype";
// import name from "$GLOBAL$";

export class Event{

  public id !: number;
  public name !: string;
  public eventtype !: Eventtype;
  public date !: string;
  public masjid !:string;
  public guest !:string;
  public eventstatus !: Eventstatus;
  public description !: string;
  public starttime !: string;
  public endtime !: string;
  public employee !:string;
  public dateupdate !:string;


  constructor(id: number, name: string, eventtype: Eventtype, date: string, masjid: string, guest: string, eventstatus: Eventstatus, description: string, starttime: string, endtime: string, employee: string, dateupdate: string) {
    this.id = id;
    this.name = name;
    this.eventtype = eventtype;
    this.date = date;
    this.masjid = masjid;
    this.guest = guest;
    this.eventstatus = eventstatus;
    this.description = description;
    this.starttime = start;
    this.endtime = end;
    this.employee = employee;
    this.dateupdate = dateupdate;
  }
}





