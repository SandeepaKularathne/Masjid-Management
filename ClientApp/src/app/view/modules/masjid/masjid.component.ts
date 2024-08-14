import {Component, ViewChild} from '@angular/core';
import {Masjid} from "../../../entity/masjid";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UiAssist} from "../../../util/ui/ui.assist";
import {MatDialog} from "@angular/material/dialog";
import {MessageComponent} from "../../../util/dialog/message/message.component";
import {ConfirmComponent} from "../../../util/dialog/confirm/confirm.component";
import {Empstatus} from "../../../entity/empstatus";
import {RegexService} from "../../../service/regexservice";
import {DatePipe} from "@angular/common";
import {AuthorizationManager} from "../../../service/authorizationmanager";
import {Emptype} from "../../../entity/emptype";
import {Msjtype} from "../../../entity/msjtype";
import {District} from "../../../entity/district";
import {City} from "../../../entity/city";
import {Province} from "../../../entity/province";
import {Cityservice} from "../../../service/cityservice";
import {Districtservice} from "../../../service/districtservice";
import {Provinceservice} from "../../../service/provinceservice";
import {Trustee} from "../../../entity/trustee";
import {Trusteeservice} from "../../../service/trusteeservice";
import {Msjtypeservice} from "../../../service/msjtypeservice";
import {Msjstatus} from "../../../entity/msjstatus";
import {Msjstatusservice} from "../../../service/msjstatusservice";
import {MasjidService} from "../../../service/masjidservice";

@Component({
  selector: 'app-masjid',
  templateUrl: './masjid.component.html',
  styleUrls: ['./masjid.component.css']
})

export class MasjidComponent {

  columns: string[] = ['regno', 'name', 'city', 'district', 'provice'];
  headers: string[] = ['Registration No', 'Masjid Name', 'City','District', 'Provice'];
  binders: string[] = ['regno', 'name', 'city.name', 'city.district.name', 'city.district.province.name'];

  cscolumns: string[] = ['csregno', 'csname','cscity', 'csdistrict', 'csprovince'];
  csprompts: string[] = ['Search by Reg NO', 'Search by Name', 'Search by City', 'Search by District', 'Search by Province'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  masjid!: Masjid;
  oldmasjid!: Masjid;

  selectedrow: any;

  masjids: Array<Masjid> = [];
  data!: MatTableDataSource<Masjid>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  msjtypes: Array<Msjtype> = [];
  trustees: Array<Trustee> = [];
  msjstatuses: Array<Msjstatus> = [];
  cities: Array<City> = [];
  districts: Array<District> = [];
  provinces: Array<Province> = [];


  regexes: any;

  uiassist: UiAssist;

  constructor(
    private mass: MasjidService,
    private cits: Cityservice,
    private diss: Districtservice,
    private pros: Provinceservice,
    private trus: Trusteeservice,
    private msts: Msjtypeservice,
    private msjs: Msjstatusservice,
    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "csregno": new FormControl(),
      "csname": new FormControl(),
      "cscity": new FormControl(),
      "csmsjstatus": new FormControl(),
      "csdistrict": new FormControl(),
      "csprovince": new FormControl(),
    });

    this.ssearch = this.fb.group({
      "ssregno": new FormControl(),
      "ssname": new FormControl(),
      "ssmsjstatus": new FormControl(),
      "sscity": new FormControl(),
      "ssdistrict": new FormControl(),
      "ssprovince": new FormControl(),
    });


    this.form = this.fb.group({
      "regno": new FormControl('', [Validators.required]),
      "name": new FormControl('', [Validators.required]),
      "address": new FormControl('', [Validators.required]),
      "email": new FormControl('', [Validators.required]),
      "phone": new FormControl('', [Validators.required]),
      "msjtype": new FormControl('', [Validators.required]),
      "city": new FormControl('', [Validators.required]),
      "msjstatus": new FormControl('', [Validators.required]),
      "doestablished": new FormControl('', [Validators.required]),
      "nohouse": new FormControl('', [Validators.required]),
      "photo": new FormControl('', ),

    }, {updateOn: 'change'});

  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {

    this.createView();

    this.cits.getAllList().then((m: City[]) => {
      this.cities = m;
    });

    this.diss.getAllList().then((m: District[]) => {
      this.districts = m;
    });

    this.pros.getAllList().then((m: Province[]) => {
      this.provinces = m;
    });

    this.trus.getAllList().then((m: Trustee[]) => {
      this.trustees = m;
    });

    this.msjs.getAllList().then((m: Msjstatus[]) => {
      this.msjstatuses = m;
    });

    this.msts.getAllList().then((typs: Msjtype[]) => {
      this.msjtypes = typs;
    });


    this.rs.get('masjid').then((regs: []) => {
      this.regexes = regs;
      this.createForm();
    });

  }

  createView() {
    this.imageurl = 'assets/pending.gif';
    this.loadTable("");
  }


  createForm() {

    this.form.controls['city'].setValidators([Validators.required]);
    this.form.controls['regno'].setValidators([Validators.required, Validators.pattern(this.regexes['regno']['regex'])]);
    this.form.controls['name'].setValidators([Validators.required, Validators.pattern(this.regexes['name']['regex'])]);
    this.form.controls['address'].setValidators([Validators.required]);
    this.form.controls['email'].setValidators([Validators.required]);
    this.form.controls['phone'].setValidators([Validators.required,Validators.pattern(this.regexes['phone']['regex'])]);
    this.form.controls['msjtype'].setValidators([Validators.required]);
    this.form.controls['nohouse'].setValidators([Validators.required]);
    this.form.controls['doestablished'].setValidators([Validators.required, Validators.pattern(this.regexes['doestablished']['regex'])]);
    this.form.controls['photo'].setValidators([Validators.required]);
    this.form.controls['msjstatus'].setValidators([Validators.required]);


    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore

            // if (controlName == "dobirth" || controlName == "doassignment")
            if (controlName == "doestablished")
                value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldmasjid != undefined && control.valid) {
              // @ts-ignore
              if (value === this.masjid[controlName]) {
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


  loadTable(query: string) {

    this.mass.getAll(query)
      .then((mm: Masjid[]) => {
        this.masjids = mm;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch(() => {
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.masjids);
        this.data.paginator = this.paginator;
      });

  }

  filterTable(): void {





    const cserchdata = this.csearch.getRawValue();

    this.data.filterPredicate = (masjid: Masjid, filter: string) => {
      return (cserchdata.csregno == null || masjid.regno.toLowerCase().includes(cserchdata.csregno)) &&
        (cserchdata.csname == null || masjid.name.toLowerCase().includes(cserchdata.csname)) &&
        (cserchdata.cscity == null || masjid.city.name.toLowerCase().includes(cserchdata.cscity)) &&
        (cserchdata.csdistrict == null || masjid.city.district.name.toLowerCase().includes(cserchdata.csdistrict)) &&
        (cserchdata.csprovince == null || masjid.city.district.name.toLowerCase().includes(cserchdata.csprovince))
    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    let regno = sserchdata.ssregno;
    let cityid = sserchdata.sscity;


    let query = "";

    if (regno != null && regno.trim() != "") query = query + "&regno=" + regno;
    if (cityid != null) query = query + "&cityid=" + cityid;


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

  selectImage(e: any): void {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageempurl = event.target.result;
        this.form.controls['photo'].clearValidators();
      }
    }
  }

  clearImage(): void {
    this.imageempurl = 'assets/default.png';
    this.form.controls['photo'].setErrors({'required': true});
  }


  add() {

    let errors = this.getErrors();

    if (errors != "") {
      const errmsg = this.dg.open(MessageComponent, {
        width: '500px',
        data: {heading: "Errors - Masjid Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.masjid = this.form.getRawValue();

      //console.log("Photo-Before"+this.masjid.photo);
      this.masjid.photo = btoa(this.imageempurl);
      //console.log("Photo-After"+this.masjid.photo);

      let masdata: string = "";

      masdata = masdata + "<br>Reg Number is : " + this.masjid.regno;
      masdata = masdata + "<br>Name is : " + this.masjid.name;
      masdata = masdata + "<br>City is : " + this.masjid.city.name;
      masdata = masdata + "<br>District is : " + this.masjid.city.district.name;
      masdata = masdata + "<br>Province is : " + this.masjid.city.district.province.name;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Masjid Add",
          message: "Are you sure to Add the following Masjid? <br> <br>" + masdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found meka thami avula ";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("MasjidService.add(emp)");

          this.mass.add(this.masjid).then((responce: [] | undefined) => {
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
              this.clearImage();
              Object.values(this.form.controls).forEach(control => {
                control.markAsTouched();
              });
              this.loadTable("");
            }

            const stsmsg = this.dg.open(MessageComponent, {
              width: '500px',
              data: {heading: "Status -Masjid Add", message: addmessage}
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

  fillForm(masjid: Masjid) {

    // this.enableButtons(false,true,true);

    this.selectedrow=masjid;

    this.masjid = JSON.parse(JSON.stringify(masjid));
    this.oldmasjid = JSON.parse(JSON.stringify(masjid));

    if (this.masjid.photo != null) {
      this.imageempurl = atob(this.masjid.photo);
      this.form.controls['photo'].clearValidators();
    } else {
      this.clearImage();
    }
    this.masjid.photo = "";

     //@ts-ignore
    this.masjid.city = this.cities.find(g => g.id === this.masjid.city.id);
     //@ts-ignore
    this.masjid.msjstatus = this.msjstatuses.find(d => d.id === this.masjid.msjstatus.id);
     //@ts-ignore
    this.masjid.msjtype = this.msjtypes.find(s => s.id === this.masjid.msjtype.id);

    this.form.patchValue(this.masjid);
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
          data: {heading: "Errors - Masjid Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Masjid Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("MasjidService.update()");
            this.masjid = this.form.getRawValue();
            if (this.form.controls['photo'].dirty) this.masjid.photo = btoa(this.imageempurl);
            else this.masjid.photo = this.oldmasjid.photo;
            this.masjid.id = this.oldmasjid.id;

            this.mass.update(this.masjid).then((responce: [] | undefined) => {
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
                this.clearImage();
                 Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status -Masjid Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
    }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Masjid Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }

  delete() {

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Masjid Delete",
            message: "Are you sure to Delete following Masjid? <br> <br>" + this.masjid.name
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
            let delstatus: boolean = false;
            let delmessage: string = "Server Not Found";

            this.mass.delete(this.masjid.id).then((responce: [] | undefined) => {

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
                this.clearImage();
                Object.values(this.form.controls).forEach(control => { control.markAsTouched(); });
                this.loadTable("");
              }

              const stsmsg = this.dg.open(MessageComponent, {
                width: '500px',
                data: {heading: "Status - Masjid Delete ", message: delmessage}
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
            heading: "Confirmation - Masjid Clear",
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










