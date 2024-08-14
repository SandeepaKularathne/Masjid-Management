import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../reportservice';
import {MatTableDataSource} from "@angular/material/table";
import {CountByMsjCity} from "../../entity/countbymsjcity";

declare var google: any;

@Component({
  selector: 'app-designation',
  templateUrl: './countbymsjcity.component.html',
  styleUrls: ['./countbymsjcity.component.css']
})
export class CountbymsjCityComponent implements OnInit {

  countbymsjcitys!: CountByMsjCity[];
  data!: MatTableDataSource<CountByMsjCity>;

  columns: string[] = ['msjcity', 'count', 'percentage' ];
  headers: string[] = ['Msj City', 'Count', 'Percentage(%)'];
  binders: string[] = ['msjcity', 'count', 'percentage'];



  @ViewChild('barchart', { static: false }) barchart: any;
  @ViewChild('piechart', { static: false }) piechart: any;
  @ViewChild('linechart', { static: false }) linechart: any;

  constructor(private rs: ReportService) {
    //Define Interactive Panel with Needed Form Elements
  }

  ngOnInit(): void {

    this.rs.countByMsjCity()
      .then((des: CountByMsjCity[]) => {
        this.countbymsjcitys = des;
        }).finally(() => {
      this.loadTable();
      this.loadCharts();
    });

  }

  loadTable() : void{
    this.data = new MatTableDataSource(this.countbymsjcitys);
  }

  loadCharts() : void{
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawCharts.bind(this));
  }


  drawCharts() {

    const barData = new google.visualization.DataTable();
    barData.addColumn('string', 'MsjCity');
    barData.addColumn('number', 'Count');

    const pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'MsjCity');
    pieData.addColumn('number', 'Count');

    const lineData = new google.visualization.DataTable();
    lineData.addColumn('string', 'MsjCity');
    lineData.addColumn('number', 'Count');

    this.countbymsjcitys.forEach((des: CountByMsjCity) => {
      barData.addRow([des.msjcity, des.count]);
      pieData.addRow([des.msjcity, des.count]);
      lineData.addRow([des.msjcity, des.count]);
    });

    const barOptions = {
      title: 'Masjid Citys Count (Bar Chart)',
      subtitle: 'Count of Employees by Designation',
      bars: 'horizontal',
      height: 400,
      width: 600
    };

    const pieOptions = {
      title: 'Masjid Citys (Pie Chart)',
      height: 400,
      width: 550
    };

    const lineOptions = {
      title: 'Masjid Citys - Count (Line Chart)',
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
