
import {Depositstatus} from "./depositstatus";
import {Account} from "./account";
import {Masjid} from "./masjid";
import {Employee} from "./employee";

export class Deposit {

  public id !: number;
  public amount !: number;
  public depositstatus !: Depositstatus;
  public date ! : string;
  public account ! : Account;
  public masjid ! : Masjid;
  public employee ! : Employee;


  constructor(id: number, amount: number, depositstatus: Depositstatus, date: string, account: Account, masjid: Masjid, employee: Employee) {
    this.id = id;
    this.amount = amount;
    this.depositstatus = depositstatus;
    this.date = date;
    this.account = account;
    this.masjid = masjid;
    this.employee = employee;
  }
}
