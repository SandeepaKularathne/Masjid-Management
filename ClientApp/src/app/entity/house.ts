import {Rout} from "./rout";
import {Housetype} from "./housetype";
import {Housesstate} from "./housesstate";

export class House {

  public id !: number;
  public name !: string;
  public rout !: Rout;
  public huid ! : string;
  public address ! : string;
  public adultcount ! : number;
  public childrencount ! : number;
  public telephone ! : number;
  public housetype ! : Housetype;
  public housesstate ! :Housesstate;
  public description ! : string;
  public doregister ! : string;


  constructor(id: number, name: string, rout: Rout, huid: string, address: string, adultcount: number, childrencount: number, telephone: number, housetype: Housetype, description: string, doregister: string) {
    this.id = id;
    this.name = name;
    this.rout = rout;
    this.huid = huid;
    this.address = address;
    this.adultcount = adultcount;
    this.childrencount = childrencount;
    this.telephone = telephone;
    this.housetype = housetype;
    this.description = description;
    this.doregister = doregister;
  }
}
