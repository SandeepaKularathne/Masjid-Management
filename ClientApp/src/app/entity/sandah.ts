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
import {Sandahstatus} from "./sandahstatus";
import {Sandahtype} from "./sandahtype";
import {Sandahmode} from "./sandahmode";
import {Member} from "./member";

export class Sandah{

  public id !: number;
  public amount !: number;
  public referencenumber !: string;
  public date !: string;
  public time !: string;
  public description !: string;
  public sandahstatus !: Sandahstatus;
  public sandahtype !:Sandahtype;
  public sandahmode !:Sandahmode;
  public house !: House;
  public member !: Member;


  constructor(id: number, amount: number, referencenumber: string, date: string, time: string, description: string, sandahstatus: Sandahstatus, sandahtype: Sandahtype, sandahmode: Sandahmode, house: House, member: Member) {
    this.id = id;
    this.amount = amount;
    this.referencenumber = referencenumber;
    this.date = date;
    this.time = time;
    this.description = description;
    this.sandahstatus = sandahstatus;
    this.sandahtype = sandahtype;
    this.sandahmode = sandahmode;
    this.house = house;
    this.member = member;
  }
}





