import {Msjtype} from "./msjtype";
import {City} from "./city";
import {Trustee} from "./trustee";
import {Msjstatus} from "./msjstatus";
import {District} from "./district";
import {Province} from "./province";

export class Masjid{

  public id !: number;
  public regno !: string;
  public name !: string;
  public address !: string;
  public email !: string;
  public phone !: string;
  public nohouse !: number;
  public doestablished !: string;
  public photo !: string;
  public city !: City;
  public msjtype !: Msjtype;
  public msjstatus !:Msjstatus;

  constructor(id: number, regno: string, name: string, address: string, email: string, phone: string, nohouse: number, doestablished: string, photo: string, city: City, msjtype: Msjtype, msjstatus: Msjstatus) {
    this.id = id;
    this.regno = regno;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.nohouse = nohouse;
    this.doestablished = doestablished;
    this.photo = photo;
    this.city = city;
    this.msjtype = msjtype;
    this.msjstatus = msjstatus;
  }
}
