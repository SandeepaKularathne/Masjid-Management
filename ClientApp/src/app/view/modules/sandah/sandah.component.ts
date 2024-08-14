import {Component, ViewChild} from '@angular/core';
import {House} from "../../../entity/house";
import {HouseService} from "../../../service/houseservice";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatDialog} from "@angular/material/dialog";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {RegexService} from "../../../service/regexservice";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Sandah} from "../../../entity/sandah";
import {Member} from "../../../entity/member";
import {Sandahmode} from "../../../entity/sandahmode";
import {Sandahstatus} from "../../../entity/sandahstatus";
import {Sandahtype} from "../../../entity/sandahtype";
import {SandahService} from "../../../service/sandahservice";
import {Sandahstatusservice} from "../../../service/sandahstatusservice";
import {Sandahmodeservice} from "../../../service/sandahmodeservice";
import {MemberService} from "../../../service/memberservice";
import {Sandahtypeservice} from "../../../service/sandahtypeservice";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";


@Component({
  selector: 'app-sandah',
  templateUrl: './sandah.component.html',
  styleUrls: ['./sandah.component.css']
})

export class SandahComponent {

  // down table client search
  columns: string[] = ['Referencenumber',  'date','amount','sandahtype' ];
  headers: string[] = ['Reference Number',  'Registered Date','Amount','Sandah Type'];
  binders: string[] = ['referencenumber',  'date','amount','sandahtype.name'];

  cscolumns: string[] = ['csReferencenumber',  'csdate','csamount','cssandahtype' ];
  csprompts: string[] = ['Search by Ref',  'Search by date','Search by House type','Search Sandah Type'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  sandah!: Sandah;
  oldsandah!: Sandah;

  selectedrow: any;

  sandahs: Array<Sandah> = [];
  data!: MatTableDataSource<Sandah>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  //only for linked table or foreign keys
  members: Array<Member> = [];
  houses: Array<House> = [];
  sandahmodes:Array<Sandahmode>=[];
  sandahstatuses: Array<Sandahstatus> =[];
  sandahtypes: Array<Sandahtype> =[];


  regexes: any;

  uiassist: UiAssist;

  //contructor for link table & main table.
  constructor(
    private sans: SandahService,
    private ssts: Sandahstatusservice,
    private smos: Sandahmodeservice,
    private stys: Sandahtypeservice,
    private hsse: HouseService,
    private mems: MemberService,

    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

     this.csearch = this.fb.group({
      "csReferencenumber": new FormControl(),
      "csdate": new FormControl(),
      "csamount": new FormControl(),
      "cssandahtype": new FormControl(),

    });

    //Server Search top table
    this.ssearch = this.fb.group({
      "sshouse": new FormControl(),
      "ssmember": new FormControl(),
      // "sshousetype": new FormControl(),
      // "ssdesignation": new FormControl(),
      // "ssnic": new FormControl()

    });

    //all field under house table except ID
       this.form = this.fb.group({
      "amount": new FormControl('', [Validators.required]),
      "referencenumber": new FormControl('', [Validators.required]),
      "date": new FormControl('', [Validators.required]),
      "time": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "sandahstatus": new FormControl('', [Validators.required]),
      "sandahtype": new FormControl('', [Validators.required]),
      "sandahmode": new FormControl('', [Validators.required]),
      "house": new FormControl('', [Validators.required]),
      "member": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
    console.log(this.sandahs);
  }

  //except main table, other linked tables
  initialize() {

    this.createView();

    this.ssts.getAllList().then((s: Sandahstatus[]) => {
      this.sandahstatuses =s;
    });

    this.smos.getAllList().then((e: Sandahmode[]) => {
      this.sandahmodes = e;
    });

    this.stys.getAllList().then((s: Sandahtype[]) => {
      this.sandahtypes = s;
    });

    this.hsse.getAll("").then((s: House[]) => {
      this.houses = s;
    });


    this.mems.getAll("").then((s: Member[]) => {
      this.members = s;
    });


    this.rs.get('sandah').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });


  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }


  createForm() {

   //all field under main table except id
    this.form.controls['amount'].setValidators([Validators.required]);
    this.form.controls['referencenumber'].setValidators([Validators.required]);
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['time'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['sandahstatus'].setValidators([Validators.required]);
    this.form.controls['sandahtype'].setValidators([Validators.required]);
    this.form.controls['sandahmode'].setValidators([Validators.required]);
    this.form.controls['house'].setValidators([Validators.required]);
    this.form.controls['member'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "date")
                value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldsandah != undefined && control.valid) {
              // @ts-ignore
              if (value === this.sandah[controlName]) {
                control.markAsPristine();
              } else {
                control.markAsDirty();
              }
            } else {
              control.markAsPristine();
            }
          }
      );

      }

    // this.enableButtons(true,false,false);

  }


  // enableButtons(add:boolean, upd:boolean, del:boolean){
  //   this.enaadd=add;
  //   this.enaupd=upd;
  //   this.enadel=del;
  // }

//only main houses
  loadTable(query: string) {

    this.sans.getAll(query)
      .then((emps: Sandah[]) => {
        this.sandahs = emps;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.sandahs);
        this.data.paginator = this.paginator;
      });

  }

  // getModi(element: House) {
  //   return element.number + '(' + element.callingname + ')';
  // }


  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    // cscolumns: string[] = ['csReferencenumber',  'csdate','csamount','cssandahtype' ];

      this.data.filterPredicate = (sandah: Sandah, filter: string) => {
      return (cserchdata.csReferencenumber == null || sandah.referencenumber.toLowerCase().includes(cserchdata.csReferencenumber)) &&
        (cserchdata.csdate == null || sandah.date.toLowerCase().toString().includes(cserchdata.csdate)) &&
        (cserchdata.csamount == null || sandah.amount.toString().includes(cserchdata.csamount)) &&
        (cserchdata.cssandahtype == null || sandah.sandahtype.toString().toLowerCase().includes(cserchdata.cssandahtype)) ;

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    //these to be assinged in server side house controller get mapping line30-32


    let houseid = sserchdata.sshouse;
    let memberid = sserchdata.ssmember;



    let query = "";

    if (houseid != null) query = query + "&house=" + houseid;
    if (memberid != null) query = query + "&member=" + memberid;



    if (query != "") query = query.replace(/^./, "?")

    this.loadTable(query);

  }


  btnSearchClearMc(): void {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {heading: "Search Clear", message: "Are you sure to Clear the Search?"}
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        this.ssearch.reset();
        this.loadTable("");
      }
    });

  }

  // selectImage(e: any): void {
  //   if (e.target.files) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.imageempurl = event.target.result;
  //       this.form.controls['photo'].clearValidators();
  //     }
  //   }
  // }

  // clearImage(): void {
  //   this.imageempurl = 'assets/default.png';
  //   this.form.controls['photo'].setErrors({'required': true});
  // }


  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - House Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.sandah = this.form.getRawValue();
      //
      // //console.log("Photo-Before"+this.house.photo);
      // this.house.photo = btoa(this.imageempurl);
      // //console.log("Photo-After"+this.house.photo);

      let empdata: string = "";

      empdata = empdata + "<br>Refernce Number is : " + this.sandah.referencenumber;
      empdata = empdata + "<br>Amount  is : " + this.sandah.amount;
      // empdata = empdata + "<br>housestate is : " + this.sandah.housesstate.name;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Sandah Add",
          message: "Are you sure to Add the following House? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula empolyee component.ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("HouseService.add(emp)");

          this.sans.add(this.sandah).then((responce: [] | undefined) => {
            //console.log("Res-" + responce);
            //console.log("Un-" + responce == undefined);
            if (responce != undefined) { // @ts-ignore
              console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
              // @ts-ignore
              addstatus = responce['errors'] == "";
              console.log("Add Sta-" + addstatus);
              if (!addstatus) { // @ts-ignore
                addmessage = responce['errors'];
              }
            } else {
              console.log("undefined");
              addstatus = false;
              addmessage = "Content Not Found"
            }
          }).finally(() => {

            if (addstatus) {
              addmessage = "Successfully Saved";
              this.form.reset();
              // this.clearImage();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
              // window.location.reload();
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -House Add", message: addmessage}
            });

            stsmsg.afterClosed().subscribe(async result => {
              if (!result) {
                return;
              }
            });
          });
        }
      });
    }
  }


  getErrors(): string {

    let errors: string = "";

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.errors) {

        if (this.regexes[controlName] != undefined) {
          errors = errors + "<br>" + this.regexes[controlName]['message'];
        } else {
          errors = errors + "<br>Invalid " + controlName;
        }
      }
    }

    return errors;
  }

  fillForm(sandah: Sandah) {

    // this.enableButtons(false,true,true);

    this.selectedrow=sandah;
    console.log(sandah)

    this.sandah = JSON.parse(JSON.stringify(sandah));
    this.oldsandah = JSON.parse(JSON.stringify(sandah));

    // if (this.house.photo != null) {
    //   this.imageempurl = atob(this.house.photo);
    //   this.form.controls['photo'].clearValidators();
    // } else {
    //   this.clearImage();
    // }
    // this.house.photo = "";

    //filling combo on the form. left side pane

    //@ts-ignore
    this.sandah.sandahstatus = this.sandahstatuses.find(d => d.id === this.sandah.sandahstatus.id);
    //@ts-ignore
    this.sandah.sandahtype = this.sandahtypes.find(d => d.id === this.sandah.sandahtype.id);
    //@ts-ignore
    this.sandah.sandahmode = this.sandahmodes.find(s => s.id === this.sandah.sandahmode.id);
    //@ts-ignore
    this.sandah.house= this.houses.find(s => s.id === this.sandah.house.id);

    console.log(this.members)

    //@ts-ignore
   this.sandah.member = this.members.find(s =>s.id == this.sandah.memberByMemberId.id)


    this.form.patchValue(this.sandah);
    this.form.markAsPristine();

  }


  getUpdates(): string {

    let updates: string = "";
    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      if (control.dirty) {
        updates = updates + "<br>" + controlName.charAt(0).toUpperCase() + controlName.slice(1)+" Changed";
      }
    }
    return updates;
  }


  update() {

    let errors = this.getErrors();

    if (errors != "") {

        const errmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Errors - Sandah Update ", message: "You have following Errors <br> " + errors}
        });
        errmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

    } else {

      let updates: string = this.getUpdates();

      if (updates != "") {

        let updstatus: boolean = false;
        let updmessage: string = "Server Not Found";

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - House Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("HouseService.update()");
            this.sandah = this.form.getRawValue();
            // if (this.form.controls['photo'].dirty) this.house.photo = btoa(this.imageempurl);
            // else this.house.photo = this.oldhouse.photo;
            this.sandah.id = this.oldsandah.id;

            this.sans.update(this.sandah).then((responce: [] | undefined) => {
              //console.log("Res-" + responce);
             // console.log("Un-" + responce == undefined);
              if (responce != undefined) { // @ts-ignore
                //console.log("Add-" + responce['id'] + "-" + responce['url'] + "-" + (responce['errors'] == ""));
                // @ts-ignore
                updstatus = responce['errors'] == "";
                //console.log("Upd Sta-" + updstatus);
                if (!updstatus) { // @ts-ignore
                  updmessage = responce['errors'];
                }
              } else {
                //console.log("undefined");
                updstatus = false;
                updmessage = "Content Not Found"
              }
            } ).finally(() => {
              if (updstatus) {
                updmessage = "Successfully Updated";
                this.form.reset();
                // this.clearImage();
                 Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -House Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
    }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Sandah Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }



  delete() {

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Sandah Delete",
            message: "Are you sure to Delete following Sandah Entry? <br> <br>" + this.sandah.id
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
            let delstatus: boolean = false;
            let delmessage: string = "Server Not Found";

            this.sans.delete(this.sandah.id).then((responce: [] | undefined) => {

                if (responce != undefined) { // @ts-ignore
                  delstatus = responce['errors'] == "";
                if (!delstatus) { // @ts-ignore
                  delmessage = responce['errors'];
                }
              } else {
                delstatus = false;
                delmessage = "Content Not Found"
              }
            } ).finally(() => {
              if (delstatus) {
                delmessage = "Successfully Deleted";
                this.form.reset();
                // this.clearImage();
                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status - House Delete ", message: delmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
      }

      clear():void{
        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - House Clear",
            message: "Are you sure to Clear following Details ? <br> <br>"
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
             this.form.reset()
          }
        });
      }


}










