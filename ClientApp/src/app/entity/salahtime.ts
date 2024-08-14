export class Salahtime {

  public id !: number;
  public fajr !: string;
  public luhar !: string;
  public asr !: string;
  public magrib !: string;
  public isha !: string;
  public date !: string | null;


  constructor(id: number, fajr: string, luhar: string, asr: string, magrib: string, isha: string, date: string) {
    this.id = id;
    this.fajr = fajr;
    this.luhar = luhar;
    this.asr = asr;
    this.magrib = magrib;
    this.isha = isha;
    this.date = date;
  }
}
