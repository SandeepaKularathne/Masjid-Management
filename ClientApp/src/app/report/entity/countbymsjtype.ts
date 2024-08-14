export class CountByMsjType {

  public id !: number;
  public msjtype !: string;
  public count !: number;
  public perecentage !: number;

  constructor(id:number,msjtype:string,count:number,perecentage:number) {
    this.id=id;
    this.msjtype=msjtype;
    this.count=count;
    this.perecentage=perecentage;
  }

}
