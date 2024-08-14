export class CountByMsj {

  public id !: number;
  public msj !: string;
  public count !: number;
  public perecentage !: number;

  constructor(id:number,msj:string,count:number,perecentage:number) {
    this.id=id;
    this.msj=msj;
    this.count=count;
    this.perecentage=perecentage;
  }

}
