import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../reportservice';
import {MatTableDataSource} from "@angular/material/table";
import {CountByMsjType} from "../../entity/countbymsjtype";

declare var google: any;

@Component({
  selector: 'app-designation',
  templateUrl: './countbymsjtype.component.html',
  styleUrls: ['./countbymsjtype.component.css']
})
export class CountByMsjTypeComponent implements OnInit {

  countbymsjtypes!: CountByMsjType[];
  data!: MatTableDataSource<CountByMsjType>;

  columns: string[] = ['msjtype', 'count', 'percentage' ];
  headers: string[] = ['Msj Type', 'Count', 'Percentage(%)'];
  binders: string[] = ['msjtype', 'count', 'percentage'];



  @ViewChild('barchart', { static: false }) barchart: any;
  @ViewChild('piechart', { static: false }) piechart: any;
  @ViewChild('linechart', { static: false }) linechart: any;

  constructor(private rs: ReportService) {
    //Define Interactive Panel with Needed Form Elements
  }

  ngOnInit(): void {

    this.rs.countByMsjType()
      .then((des: CountByMsjType[]) => {
        this.countbymsjtypes = des;
        }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });

  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.countbymsjtypes);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }


  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'MsjType');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'MsjType');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'MsjType');
    lineData.addColumn('number', 'Count');

    this.countbymsjtypes.forEach((des: CountByMsjType) => {
      barData.addRow([des.msjtype, des.count]);
      pieData.addRow([des.msjtype, des.count]);
      lineData.addRow([des.msjtype, des.count]);
    });

    const barOptions = {
      title: 'Masjid Types Count (Column Chart)',
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

    const barChart = new google.visualization.ColumnChart(this.barchart.nativeElement);
    barChart.draw(barData, barOptions);

    const pieChart = new google.visualization.PieChart(this.piechart.nativeElement);
    pieChart.draw(pieData, pieOptions);

    const lineChart = new google.visualization.LineChart(this.linechart.nativeElement);
    lineChart.draw(lineData, lineOptions);
  }
}
