import {Component, OnInit, ViewChild} from '@angular/core';
import {getLocaleDateFormat} from "@angular/common";
import {Salahtime} from "../../entity/salahtime";
import {SalahtimeService} from "../../service/salahtimeservice";
import {UiAssist} from "../../util/ui/ui.assist";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  columns: string[] = [ 'date','fajr','luhar','ast','magrib','isha' ];
  headers: string[] = ['Date', 'Fajr','Luhar','Asr','Magrib','Isha'];
  binders: string[] = ['date', 'fajr','luhar','asr','magrib','isha'];

  salahtime!: Salahtime;
  salahtimes: Array<Salahtime> = [];
  uiassist: UiAssist;
  data!: MatTableDataSource<Salahtime>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private slts: SalahtimeService){
    this.uiassist = new UiAssist(this);
  }

  ngOnInit() {
    console.log(this.salahtimes);
    this.loadTable('');
  }


  generalmessages: any[] = [
    {name: 'Riyaz Mohamed', tel:'0777334337' ,updated: new Date(),icon:'phone'},
    {name: 'Sandeepa Kularathne', tel:'0777334337' ,updated: '2024-04-01',icon:'contact_phone'},
    {name: 'Mohamed Riyaz', tel:'0777334337' ,updated: new Date(),icon:'person'},
    {name: 'Mohamed Riyaz', tel:'0777334337' ,updated: new Date(),icon:'phone_in_talk'},
    {name: 'Mohamed Riyaz', tel:'0777334337' ,updated: new Date(),icon:'chat'},
    {name: 'Mohamed Riyaz', tel:'0777334337' ,updated: new Date(),icon:'message'},
  ];

  loadTable(query: string) {

    this.slts.getAll("")
        .then((emps: Salahtime[]) => {
          this.salahtimes = emps;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.data = new MatTableDataSource(this.salahtimes.reverse());
          this.data.paginator = this.paginator;
        });

  }

}


