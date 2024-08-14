import {Gender} from "./gender";
import {Civilstatus} from "./civilstatus";
import {Memberstatus} from "./memberstatus";
import {Jobstatus} from "./jobstatus";
import {Membertype} from "./membertype";
import {House} from "./house";
import {Employee} from "./employee";

export class Member{

  public id !: number;
  public fullname !: string;
  public callingname !: string;
  public photo !: string;
  public dob !: string;
  public nic !: string;
  public doregister !: string;
  public gender !: Gender;
  public civilstatus !: Civilstatus;
  public memberstatus !: Memberstatus;
  public employee !:Employee;
  public jobstatus !: Jobstatus;
  public membertype !:Membertype;
  public house !: House;


  constructor(id: number, fullname: string, callingname: string, photo: string, dob: string, nic: string, doregister: string, gender: Gender, civilstatus: Civilstatus, memberstatus: Memberstatus, employee: Employee, jobstatus: Jobstatus, membertype: Membertype, house: House) {
    this.id = id;
    this.fullname = fullname;
    this.callingname = callingname;
    this.photo = photo;
    this.dob = dob;
    this.nic = nic;
    this.doregister = doregister;
    this.gender = gender;
    this.civilstatus = civilstatus;
    this.memberstatus = memberstatus;
    this.employee = employee;
    this.jobstatus = jobstatus;
    this.membertype = membertype;
    this.house = house;
  }
}





