
import {Masjid} from "./masjid";
import {Employee} from "./employee";
import {Receivestatus} from "./receivestatus";
import {Member} from "./member";
import {Receivecategory} from "./receivecategory";
import {Sandah} from "./sandah";

export class Receive{

  public id !: number;
  public date !:string;
  public amount!:number;
  public receivecategory!:Receivecategory
  public member !: Member;
  public sandah !:Sandah;
  public receivestatus !: Receivestatus;
  public description !: string;
  public masjid !: Masjid;
  public employee !: Employee;


  constructor(id: number, date: string, amount: number, receivecategory: Receivecategory, member: Member, sandah: Sandah, receivestatus: Receivestatus, description: string, masjid: Masjid, employee: Employee) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.receivecategory = receivecategory;
    this.member = member;
    this.sandah = sandah;
    this.receivestatus = receivestatus;
    this.description = description;
    this.masjid = masjid;
    this.employee = employee;
  }
}





