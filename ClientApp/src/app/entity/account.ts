
export class Account {

  public id !: number;
  public bank !:string;
  public accno !: number;
  public balance !:number;


  constructor(id: number, bank: string, accno: number, balance: number) {
    this.id = id;
    this.bank = bank;
    this.accno = accno;
    this.balance = balance;
  }
}


