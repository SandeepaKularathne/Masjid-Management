import {Component, ViewChild} from '@angular/core';
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
import {Salahtime} from "../../../entity/salahtime";
import {SalahtimeService} from "../../../service/salahtimeservice";



@Component({
  selector: 'app-salahtime',
  templateUrl: './salahtime.component.html',
  styleUrls: ['./salahtime.component.css']
})

export class SalahtimeComponent {

  // down table headers
  columns: string[] = [ 'date','fajr','luhar','ast','magrib','isha' ];
  headers: string[] = ['Date', 'Fajr','Luhar','Asr','Magrib','Isha'];
  binders: string[] = ['date', 'fajr','luhar','asr','magrib','isha'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  salahtime!: Salahtime;
  oldsalahtime!: Salahtime;

  selectedrow: any;

  salahtimes: Array<Salahtime> = [];
  data!: MatTableDataSource<Salahtime>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  enaadd:boolean = true;
  enaupd:boolean = false;
  enadel:boolean = false;

  regexes: any;

  uiassist: UiAssist;

  constructor(
    private slts: SalahtimeService,
    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {

    this.uiassist = new UiAssist(this);
    this.ssearch = this.fb.group({
      "ssdate": new FormControl(),
    });

    //all field under house table except ID
    this.form = this.fb.group({
      "date": new FormControl('', [Validators.required]),
      "fajr": new FormControl('', [Validators.required]),
      "luhar": new FormControl('', [Validators.required]),
      "asr": new FormControl('', [Validators.required]),
      "magrib": new FormControl('', [Validators.required]),
      "isha": new FormControl('', [Validators.required]),


    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
    console.log(this.salahtimes);
  }

  //except main table, other linked tables
  initialize() {

    this.createView();

    this.slts.getAll("").then((s: Salahtime[]) => {
      this.salahtimes =s;
    });


    this.rs.get('salahtime').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }


  createForm() {

    this.form.controls['date'].setValidators([Validators.required]);
    this.form.controls['fajr'].setValidators([Validators.required]);
    this.form.controls['luhar'].setValidators([Validators.required]);
    this.form.controls['asr'].setValidators([Validators.required]);
    this.form.controls['magrib'].setValidators([Validators.required]);
    this.form.controls['isha'].setValidators([Validators.required]);

    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
          // @ts-ignore
          if (controlName == "date")
            value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

          if (this.oldsalahtime != undefined && control.valid) {
            // @ts-ignore
            if (value === this.salahtime[controlName]) {
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
    this.enableButtons(true,false,false);
  }

  enableButtons(add:boolean, upd:boolean, del:boolean){
    this.enaadd=add;
    this.enaupd=upd;
    this.enadel=del;
  }

  loadTable(query: string) {

    this.slts.getAll(query)
      .then((emps: Salahtime[]) => {
        this.salahtimes = emps;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.salahtimes);
        this.data.paginator = this.paginator;
      });

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let date = this.dp.transform(sserchdata.ssdate,'yyyy-MM-dd');
    let query = "";

    if (date != null) query = query + "&date=" + date;
    if (query != "") query = query.replace(/^./, "?")

    console.log(query)
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

      this.salahtime = this.form.getRawValue();
      this.salahtime.date = this.dp.transform(this.salahtime.date, 'yyyy-MM-dd');
      this.salahtime.fajr = this.salahtime.fajr + ':00';
      this.salahtime.luhar = this.salahtime.luhar + ':00';
      this.salahtime.asr = this.salahtime.asr + ':00';
      this.salahtime.magrib = this.salahtime.magrib + ':00';
      this.salahtime.isha = this.salahtime.isha + ':00';

      let empdata: string = "";

      empdata = empdata + "<br>Date is : " + this.salahtime.date;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Salahtime Add",
          message: "Are you sure to Add the following Salahtime? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula .ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {

          this.slts.add(this.salahtime).then((responce: [] | undefined) => {

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
              data: {heading: "Status -Salah Time Add", message: addmessage}
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

  fillForm(salahtime: Salahtime) {

    this.enableButtons(false,true,true);

    this.selectedrow=salahtime;
    console.log(salahtime)

    this.salahtime = JSON.parse(JSON.stringify(salahtime));
    this.oldsalahtime = JSON.parse(JSON.stringify(salahtime));

    //@ts-ignore
    this.salahtime.salahtimestatus = this.salahtimestatuses.find(d => d.id === this.salahtime.salahtimestatus.id);
    //@ts-ignore
    this.salahtime.guest = this.guests.find(d => d.id === this.salahtime.guest.id);
    //@ts-ignore
    this.salahtime.masjid = this.masjids.find(s => s.id === this.salahtime.masjid.id);

    console.log(this.salahtime)

    this.form.patchValue(this.salahtime);
    this.form.markAsPristine();

  }

  delete() {

    const confirm = this.dg.open(ConfirmComponent, {
      width: '500px',
      data: {
        heading: "Confirmation - Salahtime Delete",
        message: "Are you sure to Delete following Salahtime Entry? <br> <br>" + this.salahtime.id
      }
    });

    confirm.afterClosed().subscribe(async result => {
      if (result) {
        let delstatus: boolean = false;
        let delmessage: string = "Server Not Found";

        this.slts.delete(this.salahtime.id).then((responce: [] | undefined) => {

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
            this.enableButtons(true,false,false);
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
        this.enableButtons(true,false,false);
      }
    });
  }

}










