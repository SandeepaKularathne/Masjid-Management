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
import {Sermon} from "../../../entity/sermon";
import {Sermonstatus} from "../../../entity/sermonstatus";
import {SermonService} from "../../../service/sermonservice";
import {Sermonstatusservice} from "../../../service/sermonstatusservice";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Moulavi} from "../../../entity/moulavi";
import {Masjid} from "../../../entity/masjid";
import {Employee} from "../../../entity/employee";
import {Moulaviservice} from "../../../service/moulaviservice";
import {EmployeeService} from "../../../service/employeeservice";
import {MasjidService} from "../../../service/masjidservice";


@Component({
  selector: 'app-sermon',
  templateUrl: './sermon.component.html',
  styleUrls: ['./sermon.component.css']
})

export class SermonComponent {

  // down table headers
  columns: string[] = [ 'date','moulavi','masjid','sermonstatus' ];
  headers: string[] = ['Sermon Date', 'Moulavi Name','Masjid Name','Sermon Status'];
  binders: string[] = ['date',  'moulavi.name','masjid.name','sermonstatus.name'];

  // down table client search
  cscolumns: string[] = ['csdate',  'csmoulavi','csmasjid','cssermonstatus' ];
  csprompts: string[] = ['Search by Sermon date',  'Search by moulavi','Search by Masjid','Search Sermon Status'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  sermon!: Sermon;
  oldsermon!: Sermon;

  selectedrow: any;

  sermons: Array<Sermon> = [];
  data!: MatTableDataSource<Sermon>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  //only for linked table or foreign keys
  masjids: Array<Masjid> = [];
  moulavis: Array<Moulavi> = [];
  employees:Array<Employee>=[];
  sermonstatuses: Array<Sermonstatus> =[];


  regexes: any;

  uiassist: UiAssist;

  //contructor for link table & main table.
  constructor(
    private sers: SermonService,
    private ssts: Sermonstatusservice,
    private mlvs: Moulaviservice,
    private mass: MasjidService,
    private emps: EmployeeService,

    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    // ['csdate',  'csmoulavi','csmasjid','cssermonstatus' ];

     this.csearch = this.fb.group({
      "csdate": new FormControl(),
      "csmoulavi": new FormControl(),
      "csmasjid": new FormControl(),
      "cssermonstatus": new FormControl(),

    });

    //Server Search top table

    this.ssearch = this.fb.group({
      "ssdate": new FormControl(),
      "ssmoulavi": new FormControl(),
      // "sshousetype": new FormControl(),
      // "ssdesignation": new FormControl(),
      // "ssnic": new FormControl()

    });

    //all field under house table except ID
       this.form = this.fb.group({
      "date": new FormControl('', [Validators.required]),
      "masjid": new FormControl('', [Validators.required]),
      "moulavi": new FormControl('', [Validators.required]),
      "start": new FormControl('', [Validators.required]),
      "end": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "sermonstatus": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
      "dateupdate": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
    console.log(this.sermons);
  }

  //except main table, other linked tables
  initialize() {

    this.createView();


  //     private ssts: Sermonstatusservice,
  //     private mlvs: Moulaviservice,
  //     private mass: MasjidService,
  //     private emps: EmployeeService,

    this.ssts.getAllList().then((s: Sermonstatus[]) => {
      this.sermonstatuses =s;
    });

    this.mlvs.getAllList().then((e: Moulavi[]) => {
      this.moulavis = e;
    });

    this.mass.getAll("").then((s: Masjid[]) => {
      this.masjids = s;
    });

    this.emps.getAll("").then((s: Employee[]) => {
      this.employees = s;
    });


    this.rs.get('sermon').then((regs: []) => {
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
    this.form.controls['moulavi'].setValidators([Validators.required]);
    this.form.controls['sermonstatus'].setValidators([Validators.required]);
    this.form.controls['start'].setValidators([Validators.required]);
    this.form.controls['end'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['dateupdate'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "date")
                value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldsermon != undefined && control.valid) {
              // @ts-ignore
              if (value === this.sermon[controlName]) {
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

    this.sers.getAll(query)
      .then((emps: Sermon[]) => {
        this.sermons = emps;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.sermons);
        this.data.paginator = this.paginator;
      });

  }

  // getModi(element: House) {
  //   return element.number + '(' + element.callingname + ')';
  // }

  filterTable(): void {

    // cscolumns: string[] = ['csdate',  'csmoulavi','csmasjid','cssermonstatus' ];

    const cserchdata = this.csearch.getRawValue();


      this.data.filterPredicate = (sermon: Sermon, filter: string) => {
      return (cserchdata.csmoulavi == null || sermon.moulavi.toString().includes(cserchdata.csmoulavi)) &&
        (cserchdata.csdate == null || sermon.date.toLowerCase().toString().includes(cserchdata.csdate)) &&
        (cserchdata.cssermonstatus == null || sermon.sermonstatus.toString().includes(cserchdata.cssermonstatus)) &&
        (cserchdata.csmasjid == null || sermon.masjid.toString().toLowerCase().includes(cserchdata.csmasjid)) ;

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    //these to be assinged in server side controller get mapping line30-32 but as its ??


    let date = this.dp.transform(sserchdata.ssdate,'yyyy-MM-dd');
    let moulaviid = sserchdata.ssmoulavi;



    let query = "";

    if (date != null) query = query + "&date=" + date;
    if (moulaviid != null) query = query + "&moulaviid=" + moulaviid;


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

      this.sermon = this.form.getRawValue();
      //
      // //console.log("Photo-Before"+this.house.photo);
      // this.house.photo = btoa(this.imageempurl);
      // //console.log("Photo-After"+this.house.photo);

      let empdata: string = "";

      empdata = empdata + "<br>Date is : " + this.sermon.date;
      empdata = empdata + "<br> Refer Description : " + this.sermon.description;
      // empdata = empdata + "<br>housestate is : " + this.sermon.housesstate.name;
      //why cannot caputure inner inner tables?

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Sermon Add",
          message: "Are you sure to Add the following Sermon? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula .ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("HouseService.add(emp)");

          this.sers.add(this.sermon).then((responce: [] | undefined) => {
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

  fillForm(sermon: Sermon) {

    // this.enableButtons(false,true,true);

    this.selectedrow=sermon;
    console.log(sermon)

    this.sermon = JSON.parse(JSON.stringify(sermon));
    this.oldsermon = JSON.parse(JSON.stringify(sermon));

    // if (this.house.photo != null) {
    //   this.imageempurl = atob(this.house.photo);
    //   this.form.controls['photo'].clearValidators();
    // } else {
    //   this.clearImage();
    // }
    // this.house.photo = "";

    //filling combo on the form. left side pane

    //@ts-ignore
    this.sermon.sermonstatus = this.sermonstatuses.find(d => d.id === this.sermon.sermonstatus.id);
    //@ts-ignore
    this.sermon.moulavi = this.moulavis.find(d => d.id === this.sermon.moulavi.id);
    //@ts-ignore
    this.sermon.masjid = this.masjids.find(s => s.id === this.sermon.masjid.id);
    //@ts-ignore
    // this.sermon.date= this.find(s => s.id === this.sermon.house.id);

    console.log(this.sermon)

    this.form.patchValue(this.sermon);
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
          data: {heading: "Errors - Sermon Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Sermon Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("HouseService.update()");
            this.sermon = this.form.getRawValue();
            // if (this.form.controls['photo'].dirty) this.house.photo = btoa(this.imageempurl);
            // else this.house.photo = this.oldhouse.photo;
            this.sermon.id = this.oldsermon.id;

            this.sers.update(this.sermon).then((responce: [] | undefined) => {
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
          data: {heading: "Confirmation - Sermon Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }



  delete() {

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Sermon Delete",
            message: "Are you sure to Delete following Sermon Entry? <br> <br>" + this.sermon.id
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
            let delstatus: boolean = false;
            let delmessage: string = "Server Not Found";

            this.sers.delete(this.sermon.id).then((responce: [] | undefined) => {

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










