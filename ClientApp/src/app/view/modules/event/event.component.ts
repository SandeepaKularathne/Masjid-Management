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
import {Event} from "../../../entity/event";
import {Eventstatus} from "../../../entity/eventstatus";
import {EventService} from "../../../service/eventservice";
import {Eventstatusservice} from "../../../service/eventstatusservice";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Masjid} from "../../../entity/masjid";
import {Employee} from "../../../entity/employee";
import {EmployeeService} from "../../../service/employeeservice";
import {MasjidService} from "../../../service/masjidservice";
import {Eventtype} from "../../../entity/eventtype";
import {Eventtypeservice} from "../../../service/eventtypeservice";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent {

  // down table headers
  columns: string[] = [ 'date','guest','masjid','eventstatus' ];
  headers: string[] = ['Event Date', 'Guest Name','Masjid Name','Event Status'];
  binders: string[] = ['date',  'guest','masjid.name','eventstatus.name'];

  // down table client search
  cscolumns: string[] = ['csdate',  'csguest','csmasjid','cseventstatus' ];
  csprompts: string[] = ['Search by Event date',  'Search by guest','Search by Masjid','Search Event Status'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  event!: Event;
  oldevent!: Event;

  selectedrow: any;

  events: Array<Event> = [];
  data!: MatTableDataSource<Event>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  //only for linked table or foreign keys
  masjids: Array<Masjid> = [];
  employees:Array<Employee>=[];
  eventstatuses: Array<Eventstatus> =[];
  eventtypes:Array<Eventtype>=[];


  regexes: any;

  uiassist: UiAssist;

  //contructor for link table & main table.
  constructor(
    private evnts: EventService,
    private evst: Eventstatusservice,
    private evty :Eventtypeservice,
    private mass: MasjidService,
    private emps: EmployeeService,

    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    // ['csdate',  'csguest','csmasjid','cseventstatus' ];

     this.csearch = this.fb.group({
      "csdate": new FormControl(),
      "csguest": new FormControl(),
      "csmasjid": new FormControl(),
      "cseventstatus": new FormControl(),

    });

    //Server Search top table

    this.ssearch = this.fb.group({
      "ssdate": new FormControl(),
      "ssguest": new FormControl(),
      // "sshousetype": new FormControl(),
      // "ssdesignation": new FormControl(),
      // "ssnic": new FormControl()

    });

    //all field under house table except ID
       this.form = this.fb.group({
      "date": new FormControl('', [Validators.required]),
      "name": new FormControl('', [Validators.required]),
      "guest": new FormControl('', [Validators.required]),
      "eventtype": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "eventstatus": new FormControl('', [Validators.required]),
      "masjid": new FormControl('', [Validators.required]),
      "starttime": new FormControl('', [Validators.required]),
      "endtime": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),


    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
    console.log(this.events);
  }

  //except main table, other linked tables
  initialize() {

    this.createView();


  // private evnts: EventService,
  //     private evst: Eventstatusservice,
  //     private evty :Eventtypeservice,
  //     private mass: MasjidService,
  //     private emps: EmployeeService,

    this.evst.getAllList().then((s: Eventstatus[]) => {
      this.eventstatuses =s;
    });

    // this.mlvs.getAllList().then((e: Guest[]) => {
    //   this.guests = e;
    // });

    this.mass.getAll("").then((s: Masjid[]) => {
      this.masjids = s;
    });

    this.emps.getAll("").then((s: Employee[]) => {
      this.employees = s;
    });

    this.evst.getAllList().then((s: Eventstatus[]) => {
      this.eventstatuses = s;
    });


    this.evty.getAllList().then((s: Eventtype[]) => {
      this.eventtypes = s;
    });

        this.rs.get('event').then((regs: []) => {
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
    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['masjid'].setValidators([Validators.required]);
    this.form.controls['guest'].setValidators([Validators.required]);
    this.form.controls['name'].setValidators([Validators.required]);
    this.form.controls['eventstatus'].setValidators([Validators.required]);
    this.form.controls['eventtype'].setValidators([Validators.required]);
    this.form.controls['starttime'].setValidators([Validators.required]);
    this.form.controls['endtime'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);
    // this.form.controls['dateupdate'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "date")
                value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldevent != undefined && control.valid) {
              // @ts-ignore
              if (value === this.event[controlName]) {
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

    this.evnts.getAll(query)
      .then((emps: Event[]) => {
        this.events = emps;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.events);
        this.data.paginator = this.paginator;
      });

  }

  // getModi(element: House) {
  //   return element.number + '(' + element.callingname + ')';
  // }

  filterTable(): void {

    // cscolumns: string[] = ['csdate',  'csguest','csmasjid','cseventstatus' ];

    const cserchdata = this.csearch.getRawValue();


      this.data.filterPredicate = (event: Event, filter: string) => {
      return (cserchdata.csguest == null || event.guest.toLowerCase().includes(cserchdata.csguest)) &&
        (cserchdata.csdate == null || event.date.toLowerCase().toString().includes(cserchdata.csdate)) &&
        (cserchdata.cseventstatus == null || event.eventstatus.toString().includes(cserchdata.cseventstatus)) &&
        (cserchdata.csmasjid == null || event.masjid.toString().toLowerCase().includes(cserchdata.csmasjid)) ;

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    //these to be assinged in server side controller get mapping line30-32 but as its ??


    let date = this.dp.transform(sserchdata.ssdate,'yyyy-MM-dd');
    let guestid = sserchdata.ssguest;



    let query = "";

    if (date != null) query = query + "&date=" + date;
    if (guestid != null) query = query + "&guestid=" + guestid;


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

      this.event = this.form.getRawValue();
      //
      // //console.log("Photo-Before"+this.house.photo);
      // this.house.photo = btoa(this.imageempurl);
      // //console.log("Photo-After"+this.house.photo);

      let empdata: string = "";

      empdata = empdata + "<br>Date is : " + this.event.date;
      empdata = empdata + "<br> Refer Description : " + this.event.description;
      // empdata = empdata + "<br>Event is : " + this.event.housesstate.name;
      //why cannot caputure inner inner tables?

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Event Add",
          message: "Are you sure to Add the following Event? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula .ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("HouseService.add(emp)");

          this.evnts.add(this.event).then((responce: [] | undefined) => {
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

  fillForm(event: Event) {

    // this.enableButtons(false,true,true);

    this.selectedrow=event;
    console.log(event)

    this.event = JSON.parse(JSON.stringify(event));
    this.oldevent = JSON.parse(JSON.stringify(event));

    // if (this.house.photo != null) {
    //   this.imageempurl = atob(this.house.photo);
    //   this.form.controls['photo'].clearValidators();
    // } else {
    //   this.clearImage();
    // }
    // this.house.photo = "";

    //filling combo on the form. left side pane

    //@ts-ignore
    this.event.eventstatus = this.eventstatuses.find(d => d.id === this.event.eventstatus.id);
    //@ts-ignore
    this.event.guest = this.guests.find(d => d.id === this.event.guest.id);
    //@ts-ignore
    this.event.masjid = this.masjids.find(s => s.id === this.event.masjid.id);
    //@ts-ignore
    // this.event.date= this.find(s => s.id === this.event.house.id);

    console.log(this.event)

    this.form.patchValue(this.event);
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
          data: {heading: "Errors - Event Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Event Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("HouseService.update()");
            this.event = this.form.getRawValue();
            // if (this.form.controls['photo'].dirty) this.house.photo = btoa(this.imageempurl);
            // else this.house.photo = this.oldhouse.photo;
            this.event.id = this.oldevent.id;

            this.evnts.update(this.event).then((responce: [] | undefined) => {
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
          data: {heading: "Confirmation - Event Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }



  delete() {

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Event Delete",
            message: "Are you sure to Delete following Event Entry? <br> <br>" + this.event.id
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
            let delstatus: boolean = false;
            let delmessage: string = "Server Not Found";

            this.evnts.delete(this.event.id).then((responce: [] | undefined) => {

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










