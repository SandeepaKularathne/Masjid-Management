import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../reportservice';
import {MatTableDataSource} from "@angular/material/table";
import {CountByMsj} from "../../entity/countbymsj";

declare var google: any;

@Component({
  selector: 'app-designation',
  templateUrl: './countbymsj.component.html',
  styleUrls: ['./countbymsj.component.css']
})
export class CountByMsjComponent implements OnInit {

  countbymsjs!: CountByMsj[];
  data!: MatTableDataSource<CountByMsj>;

  columns: string[] = ['msj', 'count', 'percentage' ];
  headers: string[] = ['Msj Type', 'Count', 'Percentage(%)'];
  binders: string[] = ['msj', 'count', 'percentage'];



  @ViewChild('barchart', { static: false }) barchart: any;
  @ViewChild('piechart', { static: false }) piechart: any;
  @ViewChild('linechart', { static: false }) linechart: any;

  constructor(private rs: ReportService) {
    //Define Interactive Panel with Needed Form Elements
  }

  ngOnInit(): void {

    this.rs.countByMsj()
      .then((des: CountByMsj[]) => {
        this.countbymsjs = des;
        }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });

  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.countbymsjs);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }


  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'Msj');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'Msj');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'Msj');
    lineData.addColumn('number', 'Count');

    this.countbymsjs.forEach((des: CountByMsj) => {
      barData.addRow([des.msj, des.count]);
      pieData.addRow([des.msj, des.count]);
      lineData.addRow([des.msj, des.count]);
    });

    const barOptions = {
      title: 'Masjid Types Count (Bar Chart)',
      subtitle: 'Count of Employees by Designation',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const pieOptions = {
      title: 'Masjid Types (Pie Chart)',
      height: 400,
      width: 550
    };

    const lineOptions = {
      title: 'Masjid Types - Count (Line Chart)',
      height: 400,
      width: 600
    };

    const barChart = new google.visualization.BarChart(this.barchart.nativeElement);
    barChart.draw(barData, barOptions);

    const pieChart = new google.visualization.PieChart(this.piechart.nativeElement);
    pieChart.draw(pieData, pieOptions);

    const lineChart = new google.visualization.LineChart(this.linechart.nativeElement);
    lineChart.draw(lineData, lineOptions);
  }
}
