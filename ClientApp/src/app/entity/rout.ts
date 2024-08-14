import {Masjid} from "./masjid";

export class Rout {


  public id !: number;
  public name !: string;
  public masjid !: Masjid;

  constructor(id: number, name: string, masjid: Masjid) {
    this.id = id;
    this.name = name;
    this.masjid = masjid;

  }


}
