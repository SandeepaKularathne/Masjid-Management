export class CountByMsjCity {

  public id !: number;
  public msjcity !: string;
  public count !: number;
  public perecentage !: number;

  constructor(id:number,msjcity:string,count:number,perecentage:number) {
    this.id=id;
    this.msjcity=msjcity;
    this.count=count;
    this.perecentage=perecentage;
  }

}
