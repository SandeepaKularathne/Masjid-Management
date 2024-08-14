

import {Masjid} from "./masjid";
import {Employee} from "./employee";
import {Account} from "./account";


export class Withdraw {

  public id !: number;
  public amount !: number;
  public account ! : Account;
  public dowithdraw ! : String;
  public description ! : String;
  public masjid ! : Masjid;
  public employee ! : Employee;


  constructor(id: number, amount: number, account: Account, dowithdraw: String, description: String, masjid: Masjid, employee: Employee) {
    this.id = id;
    this.amount = amount;
    this.account = account;
    this.dowithdraw = dowithdraw;
    this.description = description;
    this.masjid = masjid;
    this.employee = employee;
  }
}
