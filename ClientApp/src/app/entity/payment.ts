
import {Paymentstatus} from "./paymentstatus";
import {Paymenttype} from "./paymenttype";
import {Masjid} from "./masjid";
import {Employee} from "./employee";


export class Payment {

  public id !: number;
  public amount !: number;
  public paymentstatus !: Paymentstatus;
  public paymenttype !: Paymenttype;
  public dopaid ! : String;
  public description ! : String;
  public masjid ! : Masjid;
  public employee ! : Employee;


  constructor(id: number, amount: number, paymentstatus: Paymentstatus, paymenttype: Paymenttype, dopaid: String, description: String, masjid: Masjid, employee: Employee) {
    this.id = id;
    this.amount = amount;
    this.paymentstatus = paymentstatus;
    this.paymenttype = paymenttype;
    this.dopaid = dopaid;
    this.description = description;
    this.masjid = masjid;
    this.employee = employee;
  }
}
