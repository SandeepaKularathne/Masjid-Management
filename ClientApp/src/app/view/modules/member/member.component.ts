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
import {Member} from "../../../entity/member";
import {Memberstatus} from "../../../entity/memberstatus";
import {Membertype} from "../../../entity/membertype";
import {Jobstatus} from "../../../entity/jobstatus";
import {Civilstatus} from "../../../entity/civilstatus";
import {MemberService} from "../../../service/memberservice";
import {Membertypeservice} from "../../../service/membertypeservice";
import {Memberstatusservice} from "../../../service/memberstatusservice";
import {Jobstatusservice} from "../../../service/jobstatusservice";
import {Civilstatusservice} from "../../../service/civilstatusservice";
import {GenderService} from "../../../service/genderservice";
import {EmployeeService} from "../../../service/employeeservice";
import {Gender} from "../../../entity/gender";
import {Employee} from "../../../entity/employee";


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent {

  // down table client search
  columns: string[] = ['callingname','nic','membertype','civilstatus' ];
  headers: string[] = ['Short Name', 'NIC','Member Type','Civil Status'];
  binders: string[] = ['callingname','nic','membertype.name','civilstatus.name'];

  // Client serach box.
  cscolumns: string[] = ['cscallingname',  'csnic','csmembertype','cscivilstatus' ];
  csprompts: string[] = ['Search by Calling Name',  'Search by Nic','Search by Member type','Search by Civil Status'];

  public csearch!: FormGroup;
  public ssearch!: FormGroup;
  public form!: FormGroup;

  member!: Member;
  oldmember!: Member;

  selectedrow: any;

  members: Array<Member> = [];
  data!: MatTableDataSource<Member>;
  imageurl: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  imageempurl: string = 'assets/default.png'

  // enaadd:boolean = false;
  // enaupd:boolean = false;
  // enadel:boolean = false;

  //only for linked table

  memberstatuses: Array<Memberstatus> = [];
  membertypes: Array<Membertype> =[];
  jobstatuses: Array<Jobstatus> =[];
  civilstatuses: Array<Civilstatus> =[];
  genders :Array<Gender> =[];
  employees :Array<Employee> =[];
  houses: Array<House> =[];

  regexes: any;

  uiassist: UiAssist;

  //contructor only for link table & main table.
  constructor(

    private mems: MemberService,
    private mtys: Membertypeservice,
    private msts: Memberstatusservice,
    private jbss: Jobstatusservice,
    private cvss: Civilstatusservice,
    private gens: GenderService,
    private emps: EmployeeService,
    private hous: HouseService,
    private rs: RegexService,
    private fb: FormBuilder,
    private dg: MatDialog,
    private dp: DatePipe,
    public authService:AuthorizationManager) {


    this.uiassist = new UiAssist(this);

    this.csearch = this.fb.group({
      "cscallingname": new FormControl(),
      "csnic": new FormControl(),
      "csmembertype": new FormControl(),


    });

    //Server Search top table
    this.ssearch = this.fb.group({
      "sscallingname": new FormControl(),
      "sshouse": new FormControl(),
      "ssmembertype": new FormControl(),
      // "ssdesignation": new FormControl(),
      // "ssnic": new FormControl()

    });

    //all field under member table except ID
    this.form = this.fb.group({
      "fullname": new FormControl('', [Validators.required]),
      "callingname": new FormControl('', [Validators.required]),
      "photo": new FormControl('', [Validators.required]),
      "dob": new FormControl('', [Validators.required]),
      "nic": new FormControl('', [Validators.required]),
      "gender": new FormControl('', [Validators.required]),
      "civilstatus": new FormControl('', [Validators.required]),
      "memberstatus": new FormControl('', [Validators.required]),
      "doregister": new FormControl('', [Validators.required]),
      "employee": new FormControl('', [Validators.required]),
      "jobstatus": new FormControl('', [Validators.required]),
      "membertype": new FormControl('', [Validators.required]),
      "house": new FormControl('', [Validators.required]),


    }, {updateOn: 'change'});


  }

  ngOnInit() {
    this.initialize();
  }

  //except main table, other linked tables
  initialize() {

    this.createView();

    this.mtys.getAllList().then((e: Membertype[]) => {
      this.membertypes = e;
    });

    this.msts .getAllList().then((e: Memberstatus[]) => {
      this.memberstatuses = e;
    });

    this.jbss.getAllList().then((e: Jobstatus[]) => {
      this.jobstatuses = e;
    });

    this.cvss.getAllList().then((e: Civilstatus[]) => {
      this.civilstatuses = e;
    });

    this.gens.getAllList().then((e: Gender[]) => {
      this.genders = e;
    });

    this.emps.getAllListNameId().then((e: Employee[]) => {
      this.employees = e;
    });

    this.hous.getAll("").then((e: House[]) => {
      this.houses = e;
    });

    this.rs.get('member').then((regs: []) => {
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
    this.form.controls['fullname'].setValidators([Validators.required]);
    this.form.controls['callingname'].setValidators([Validators.required]);
    this.form.controls['photo'].setValidators([Validators.required]);
    this.form.controls['dob'].setValidators([Validators.required]);
    this.form.controls['nic'].setValidators([Validators.required]);
    this.form.controls['doregister'].setValidators([Validators.required]);
    this.form.controls['gender'].setValidators([Validators.required]);
    this.form.controls['civilstatus'].setValidators([Validators.required]);
    this.form.controls['memberstatus'].setValidators([Validators.required]);
    this.form.controls['employee'].setValidators([Validators.required]);
    this.form.controls['jobstatus'].setValidators([Validators.required]);
    this.form.controls['membertype'].setValidators([Validators.required]);
    this.form.controls['house'].setValidators([Validators.required]);



    Object.values(this.form.controls).forEach( control => { control.markAsTouched(); } );

    for (const controlName in this.form.controls) {
      const control = this.form.controls[controlName];
      control.valueChanges.subscribe(value => {
            // @ts-ignore
            if (controlName == "doregister")
                value = this.dp.transform(new Date(value), 'yyyy-MM-dd');

            if (this.oldmember != undefined && control.valid) {
              // @ts-ignore
              if (value === this.member[controlName]) {
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

//only main members
  loadTable(query: string) {

    this.mems.getAll(query)
      .then((mems1: Member[]) => {
        this.members = mems1;
        this.imageurl = 'assets/fullfilled.png';
      })
      .catch((error) => {
        console.log(error);
        this.imageurl = 'assets/rejected.png';
      })
      .finally(() => {
        this.data = new MatTableDataSource(this.members);
        this.data.paginator = this.paginator;
      });

  }

  // getModi(element: Member) {
  //   return element.number + '(' + element.callingname + ')';
  // }


  filterTable(): void {

    const cserchdata = this.csearch.getRawValue();

    // "cscallingname": new FormControl(),
    //   "csnic": new FormControl(),
    //   "csdob": new FormControl(),

      this.data.filterPredicate = (member: Member, filter: string) => {
      return (cserchdata.cscallingname == null || member.callingname.toLowerCase().includes(cserchdata.cscallingname)) &&
        (cserchdata.csnic == null || member.nic.toLowerCase().includes(cserchdata.csnic)) &&
        (cserchdata.csmembertype == null || member.membertype.name.toLowerCase().includes(cserchdata.membertype)) &&
        (cserchdata.cscivilstatus == null || member.civilstatus.name.toLowerCase().includes(cserchdata.cscivilstatus)) ;

    };

    this.data.filter = 'xx';

  }

  btnSearchMc(): void {

    const sserchdata = this.ssearch.getRawValue();

    //these to be assinged in server side member controller get mapping line30-32


    let callingname = sserchdata.sscallingname;
    let houseid = sserchdata.sshouse;
    let membertypeid = sserchdata.ssmembertype;


    let query = "";

    if (houseid != null && houseid.trim() != "") query = query + "&house=" + houseid;
    if (membertypeid != null) query = query + "&membertype=" + membertypeid;
    if (callingname != null) query = query + "&callingname=" + callingname;


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
        data: {heading: "Errors - Member Add ", message: "You have following Errors <br> " + errors}
      });
      errmsg.afterClosed().subscribe(async result => {
        if (!result) {
          return;
        }
      });
    } else {

      this.member = this.form.getRawValue();
      //
      // //console.log("Photo-Before"+this.member.photo);
      // this.member.photo = btoa(this.imageempurl);
      // //console.log("Photo-After"+this.member.photo);

      let empdata: string = "";

      empdata = empdata + "<br>NIC  is : " + this.member.nic;
      empdata = empdata + "<br>Calling Name is : " + this.member.callingname;
      empdata = empdata + "<br>memberstatus is : " + this.member.memberstatus.name;

      const confirm = this.dg.open(ConfirmComponent, {
        width: '500px',
        data: {
          heading: "Confirmation - Member Add",
          message: "Are you sure to Add the following Member? <br> <br>" + empdata
        }
      });

      let addstatus: boolean = false;
      let addmessage: string = "Server Not Found  anna avula empolyee component.ts eke 351";

      confirm.afterClosed().subscribe(async result => {
        if (result) {
          // console.log("MemberService.add(emp)");

          this.mems.add(this.member).then((responce: [] | undefined) => {
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
              data: {heading: "Status -Member Add", message: addmessage}
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

        // if (this.regexes[controlName] != undefined) {
        //   errors = errors + "<br>" + this.regexes[controlName]['message'];
        // } else {
        //   errors = errors + "<br>Invalid " + controlName;
        // }
      }
    }

    return errors;
  }

  fillForm(member: Member) {

    // this.enableButtons(false,true,true);

    this.selectedrow=member;
    console.log(this.selectedrow)

    this.member = JSON.parse(JSON.stringify(member));
    this.oldmember = JSON.parse(JSON.stringify(member));

    if (this.member.photo != null) {
      this.imageempurl = atob(this.member.photo);
      this.form.controls['photo'].clearValidators();
    } else {
      this.clearImage();
    }
    this.member.photo = "";

    //filling combo on the form. left side pane

    //@ts-ignore
    this.member.memberstatus = this.memberstatuses.find(g => g.id === this.member.memberstatus.id);

    //@ts-ignore
    this.member.membertype = this.membertypes.find(d => d.id === this.member.membertype.id);

    //@ts-ignore
    this.member.jobstatus = this.jobstatuses.find(d => d.id === this.member.jobstatus.id);

     //@ts-ignore
    this.member.civilstatus = this.civilstatuses.find(d => d.id === this.member.civilstatus.id);

    //@ts-ignore
    this.member.house = this.houses.find(d => d.id === this.member.house.id);

    console.log(this.member.house)

    //@ts-ignore
    this.member.gender = this.genders.find(d => d.id === this.member.gender.id);


    //@ts-ignore
    this.member.employee = this.employees.find(d => d.id === this.member.employee.id);

    //only combos


    this.form.patchValue(this.member);
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
          data: {heading: "Errors - Member Update ", message: "You have following Errors <br> " + errors}
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
            heading: "Confirmation - Member Update",
            message: "Are you sure to Save folowing Updates? <br> <br>" + updates
          }
        });
        confirm.afterClosed().subscribe(async result => {
          if (result) {
            //console.log("MemberService.update()");
            this.member = this.form.getRawValue();
            if (this.form.controls['photo'].dirty) this.member.photo = btoa(this.imageempurl);
            else this.member.photo = this.oldmember.photo;
            this.member.id = this.oldmember.id;

            this.mems.update(this.member).then((responce: [] | undefined) => {
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
                data: {heading: "Status -Member Add", message: updmessage}
              });
              stsmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

            });
          }
        });
    }
      else {

        const updmsg = this.dg.open(MessageComponent, {
          width: '500px',
          data: {heading: "Confirmation - Member Update", message: "Nothing Changed"}
        });
        updmsg.afterClosed().subscribe(async result => { if (!result) { return; } });

      }
    }


  }



  delete() {

        const confirm = this.dg.open(ConfirmComponent, {
          width: '500px',
          data: {
            heading: "Confirmation - Member Delete",
            message: "Are you sure to Delete following Member? <br> <br>" + this.member.callingname
          }
        });

        confirm.afterClosed().subscribe(async result => {
          if (result) {
            let delstatus: boolean = false;
            let delmessage: string = "Server Not Found";

            this.mems.delete(this.member.id).then((responce: [] | undefined) => {

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
                data: {heading: "Status - Member Delete ", message: delmessage}
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
            heading: "Confirmation - Member Clear",
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










