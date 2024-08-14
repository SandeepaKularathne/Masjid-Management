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
import {Receive} from "../../../entity/receive";
import {Member} from "../../../entity/member";
import {Receivestatus} from "../../../entity/receivestatus";
import {Receivecategory} from "../../../entity/receivecategory";
import {ReceiveService} from "../../../service/receiveservice";
import {Receivestatusservice} from "../../../service/receivestatusservice";
import {MemberService} from "../../../service/memberservice";
import {Receivecategoryservice} from "../../../service/receivecategoryservice";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Masjid} from "../../../entity/masjid";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";
import {MasjidService} from "../../../service/masjidservice";
import {SandahService} from "../../../service/sandahservice";
import {Sandah} from "../../../entity/sandah";


@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})

export class ReceiveComponent {

  // down table client search
  columns: string[] = ['Receivestatus',  'date','amount','receivecategory' ];
  headers: string[] = ['Receive Status',  'Registered Date','Amount','Receive Category'];
  binders: string[] = ['receivestatus',  'date','amount','receivecategory.name'];

  cscolumns: string[] = ['csReceivestatus',  'csdate','csamount','csreceivecategory' ];
  csprompts: string[] = ['Search by Status',  'Search by date','Search by Amout','Search Receive Category'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  receive!: Receive;
  oldreceive!: Receive;

  selectedrow: any;

  receives: Array<Receive> = [];
  data!: MatTableDataSource<Receive>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  //only for linked table or foreign keys
  members: Array<Member> = [];
  masjids: Array<Masjid> = [];
  sandahs: Array<Sandah>=[];
  employees:Array<Employee>=[];
  receivestatuses: Array<Receivestatus> =[];
  receivecategorys: Array<Receivecategory> =[];


  regexes: any;

  uiassist: UiAssist;

  //contructor for link table & main table.
  constructor(
    private rcvs: ReceiveService,
    private rcst: Receivestatusservice,
    private msjs: MasjidService,
    private snds: SandahService,
    private rcct: Receivecategoryservice,
    private emse: EmployeeService,
    private mems: MemberService,

    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csReceivestatus": new FormControl(),
      "csdate": new FormControl(),
      "csamount": new FormControl(),
      "csreceivecategory": new FormControl(),

    });

    //Server Search top table
    this.ssearch = this.fb.group({
      "ssdate": new FormControl(),
      "ssmember": new FormControl(),
      "ssreceivecategory": new FormControl(),

    });

    //all field under house table except ID
    this.form = this.fb.group({
      "amount": new FormControl('', [Validators.required]),
      "receivestatus": new FormControl('', [Validators.required]),
      "date": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "sandah": new FormControl('', [Validators.required]),
      "receivecategory": new FormControl('', [Validators.required]),
      "receivemode": new FormControl('', [Validators.required]),
      "masjid": new FormControl('', [Validators.required]),
      "member": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
    console.log(this.receives);
  }

  //except main table, other linked tables
  initialize() {

    this.createView();


    this.rcst.getAllList().then((s: Receivestatus[]) => {
        this.receivestatuses =s;
    });

   this.rcct.getAllList().then((s: Receivecategory[]) => {
      this.receivecategorys = s;
    });

    this.msjs.getAll("").then((s: Masjid[]) => {
      this.masjids = s;
    });


    this.mems.getAll("").then((s: Member[]) => {
      this.members = s;
    });

    this.snds.getAll("").then((s: Sandah[]) => {
      this.sandahs = s;
    });

    this.emse.getAll("").then((s: Employee[]) => {
      this.employees = s;
    });

    this.rs.get('receive').then((regs: []) => {
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
    this.form.controls['receivestatus'].setValidators([Validators.required]);
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['time'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['receivestatus'].setValidators([Validators.required]);
    this.form.controls['receivecategory'].setValidators([Validators.required]);
    this.form.controls['receivemode'].setValidators([Validators.required]);
    this.form.controls['house'].setValidators([Validators.required]);
    this.form.controls['member'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "date")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.oldreceive != undefined && control.valid) {
            // @ts-ignore
            if (value === this.receive[controlName]) {
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

    this.rcvs.getAll(query)
      .then((emps: Receive[]) => {
        this.receives = emps;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.receives);
        this.data.paginator = this.paginator;
      });

  }

  // getModi(element: House) {
  //   return element.number + '(' + element.callingname + ')';
  // }


  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    // cscolumns: string[] = ['csReceivestatus',  'csdate','csamount','csreceivecategory' ];

    this.data.filterPredicate = (receive: Receive, filter: string) => {
      return (cserchdata.csReceivestatus == null || receive.receivestatus.toString().includes(cserchdata.csReceivestatus)) &&
        (cserchdata.csdate == null || receive.date.toLowerCase().toString().includes(cserchdata.csdate)) &&
        (cserchdata.csamount == null || receive.amount.toString().includes(cserchdata.csamount)) &&
        (cserchdata.csreceivecategory == null || receive.receivecategory.toString().toLowerCase().includes(cserchdata.csreceivecategory)) ;

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

      this.receive = this.form.getRawValue();


      let empdata: string = "";

      empdata = empdata + "<br>Refernce Number is : " + this.receive.receivestatus;
      empdata = empdata + "<br>Amount  is : " + this.receive.amount;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Receive Add",
          message: "Are you sure to Add the following House? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula empolyee component.ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("HouseService.add(emp)");

          this.rcvs.add(this.receive).then((responce: [] | undefined) => {
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

  fillForm(receive: Receive) {

    // this.enableButtons(false,true,true);

    this.selectedrow=receive;
    console.log(receive)

    this.receive = JSON.parse(JSON.stringify(receive));
    this.oldreceive = JSON.parse(JSON.stringify(receive));


    //@ts-ignore
    this.receive.receivestatus = this.receivestatuses.find(d => d.id === this.receive.receivestatus.id);
    //@ts-ignore
    this.receive.receivecategory = this.receivecategorys.find(d => d.id === this.receive.receivecategory.id);

    //@ts-ignore
    this.receive.masjid= this.masjids.find(s => s.id === this.receive.masjid.name);

      //@ts-ignore
    this.receive.member = this.members.find(s =>s.id == this.receive.member.callingname);

    //@ts-ignore
    this.receive.sandah = this.sandahs.find(s =>s.id == this.receive.sandah.sandahtype.name);

    //@ts-ignore
    this.receive.employee = this.employees.find(s =>s.id == this.receive.employee.number);

    this.form.patchValue(this.receive);
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
        data: {heading: "Errors - Receive Update ", message: "You have following Errors <br> " + errors}
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
            this.receive = this.form.getRawValue();
            // if (this.form.controls['photo'].dirty) this.house.photo = btoa(this.imageempurl);
            // else this.house.photo = this.oldhouse.photo;
            this.receive.id = this.oldreceive.id;

            this.rcvs.update(this.receive).then((responce: [] | undefined) => {
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
          data: {heading: "Confirmation - Receive Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }



  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Receive Delete",
        message: "Are you sure to Delete following Receive Entry? <br> <br>" + this.receive.id
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.rcvs.delete(this.receive   .id).then((responce: [] | undefined) => {

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










