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
import {Rout} from "../../../entity/rout";
import {Housesstate} from "../../../entity/housesstate";
import {Housetype} from "../../../entity/housetype";
import {Housetypeservice} from "../../../service/housetypeservice";
import {Routservice} from "../../../service/routservice";
import {Housesstateservice} from "../../../service/housesstateservice";


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent {

  // down table client search
  columns: string[] = ['huid',  'rout','housetype','housesstate' ];
  headers: string[] = ['HUID',  'Rout Name','House Type','House Status'];
  binders: string[] = ['huid',  'rout.name','housetype.name','housesstate.name'];

  cscolumns: string[] = ['cshuid',  'csrout','cshousetype','cshousesstate' ];
  csprompts: string[] = ['Search by HUID',  'Search by Rout','Search by House type','Search House State'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  house!: House;
  oldhouse!: House;

  selectedrow: any;

  houses: Array<House> = [];
  data!: MatTableDataSource<House>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  //only for linked table
  routs: Array<Rout> = [];
  housesstatees: Array<Housesstate> = [];
  housetypes: Array<Housetype> =[];


  regexes: any;

  uiassist: UiAssist;

  //contructor only for link table & main table.
  constructor(
    private hser: HouseService,
    private tser: Housetypeservice,
    private rser: Routservice,
    private sser: Housesstateservice,
    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "cshuid": new FormControl(),
      "csrout": new FormControl(),
      "cshousesstate": new FormControl(),
      "cshousetype": new FormControl(),

    });

    //Server Search top table
    this.ssearch = this.fb.group({
      "ssrout": new FormControl(),
      "sshuid": new FormControl(),
      "sshousetype": new FormControl(),
      // "ssdesignation": new FormControl(),
      // "ssnic": new FormControl()

    });

    //all field under house table except ID
    this.form = this.fb.group({
      "rout": new FormControl('', [Validators.required]),
      "huid": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "adultcount": new FormControl('', [Validators.required]),
      "childrencount": new FormControl('', [Validators.required]),
      "telephone": new FormControl('', [Validators.required]),
      "housetype": new FormControl('', [Validators.required]),
      "housesstate": new FormControl('', [Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "doregister": new FormControl('', [Validators.required]),

    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
  }

  //except main table, other linked tables
  initialize() {

    this.createView();

    this.tser.getAllList().then((e: Housetype[]) => {
      this.housetypes = e;
    });

    this.rser.getAllList().then((e: Rout[]) => {
      this.routs = e;
    });

    this.sser.getAllList().then((e: Housesstate[]) => {
      this.housesstatees = e;
    });

    this.rs.get('house').then((regs: []) => {
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
    this.form.controls['rout'].setValidators([Validators.required]);
    this.form.controls['huid'].setValidators([Validators.required]);
    this.form.controls['address'].setValidators([Validators.required]);
    this.form.controls['adultcount'].setValidators([Validators.required]);
    this.form.controls['childrencount'].setValidators([Validators.required]);
    this.form.controls['telephone'].setValidators([Validators.required]);
    this.form.controls['doregister'].setValidators([Validators.required]);
    this.form.controls['description'].setValidators([Validators.required]);
    this.form.controls['housetype'].setValidators([Validators.required]);
    this.form.controls['housesstate'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "doregister")
                value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldhouse != undefined && control.valid) {
              // @ts-ignore
              if (value === this.house[controlName]) {
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

    this.hser.getAll(query)
      .then((emps: House[]) => {
        this.houses = emps;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.houses);
        this.data.paginator = this.paginator;
      });

  }

  // getModi(element: House) {
  //   return element.number + '(' + element.callingname + ')';
  // }


  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

      this.data.filterPredicate = (house: House, filter: string) => {
      return (cserchdata.cshuid == null || house.huid.toLowerCase().includes(cserchdata.cshuid)) &&
        (cserchdata.csrout == null || house.rout.name.toLowerCase().includes(cserchdata.csrout)) &&
        (cserchdata.cshousesstate == null || house.housesstate.name.toLowerCase().includes(cserchdata.cshousesstate)) &&
        (cserchdata.cshousetype == null || house.housetype.name.toLowerCase().includes(cserchdata.cshousetype)) ;

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    //these to be assinged in server side house controller get mapping line30-32

    let routid = sserchdata.ssrout;
    let huid = sserchdata.sshuid;
    let housetypeid = sserchdata.sshousetype;


    let query = "";

    if (routid != null && routid.trim() != "") query = query + "&rout=" + routid;
    if (housetypeid != null) query = query + "&housetype=" + housetypeid;
    if (huid != null) query = query + "&huid=" + huid;


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

      this.house = this.form.getRawValue();
      //
      // //console.log("Photo-Before"+this.house.photo);
      // this.house.photo = btoa(this.imageempurl);
      // //console.log("Photo-After"+this.house.photo);

      let empdata: string = "";

      empdata = empdata + "<br>Rout is : " + this.house.rout.name;
      empdata = empdata + "<br>Huid is : " + this.house.huid;
      empdata = empdata + "<br>housestate is : " + this.house.housesstate.name;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - House Add",
          message: "Are you sure to Add the following House? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula empolyee component.ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("HouseService.add(emp)");

          this.hser.add(this.house).then((responce: [] | undefined) => {
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

  fillForm(house: House) {

    // this.enableButtons(false,true,true);

    this.selectedrow=house;

    this.house = JSON.parse(JSON.stringify(house));
    this.oldhouse = JSON.parse(JSON.stringify(house));

    // if (this.house.photo != null) {
    //   this.imageempurl = atob(this.house.photo);
    //   this.form.controls['photo'].clearValidators();
    // } else {
    //   this.clearImage();
    // }
    // this.house.photo = "";

    //filling combo on the form. left side pane

    //@ts-ignore
    this.house.housesstate = this.housesstatees.find(g => g.id === this.house.housesstate.id);
    //@ts-ignore
    this.house.housetype = this.housetypes.find(d => d.id === this.house.housetype.id);
    //@ts-ignore
    this.house.rout = this.routs.find(s => s.id === this.house.rout.id);


    this.form.patchValue(this.house);
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
          data: {heading: "Errors - House Update ", message: "You have following Errors <br> " + errors}
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
            this.house = this.form.getRawValue();
            // if (this.form.controls['photo'].dirty) this.house.photo = btoa(this.imageempurl);
            // else this.house.photo = this.oldhouse.photo;
            this.house.id = this.oldhouse.id;

            this.hser.update(this.house).then((responce: [] | undefined) => {
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
          data: {heading: "Confirmation - House Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }



  delete() {

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - House Delete",
            message: "Are you sure to Delete following House? <br> <br>" + this.house.huid
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
            let delstatus: boolean = false;
            let delmessage: string = "Server Not Found";

            this.hser.delete(this.house.id).then((responce: [] | undefined) => {

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










