import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./view/login/login.component";
import {MainwindowComponent} from "./view/mainwindow/mainwindow.component";
import {EmployeeComponent} from "./view/modules/employee/employee.component";
import {HomeComponent} from "./view/home/home.component";
import {UserComponent} from "./view/modules/user/user.component";
import {CountByDesignationComponent} from "./report/view/countbydesignation/countbydesignation.component";
import {ArrearsByProgramComponent} from "./report/view/arrearsbyprogram/arrearsbyprogram.component";
import {PrivilageComponent} from "./view/modules/privilage/privilage.component";
import {OperationComponent} from "./view/modules/operation/operation.component";
import {AttendanceComponent} from "./view/modules/attendance/attendance.component";
// import {SandahComponent} from "./view/modules/payment/sandah.component";
import {StudentComponent} from "./view/modules/student/student.component";
import {BatchregistrationComponent} from "./view/modules/batchregistration/batchregistration.component";
import {ClassComponent} from "./view/modules/class/class.component";
import {BookdistributionComponent} from "./view/modules/bookdistribution/bookdistribution.component";
import {MasjidComponent} from "./view/modules/masjid/masjid.component";
import {CountByMsjType} from "./report/entity/countbymsjtype";
import {HouseComponent} from "./view/modules/house/house.component";
import {MemberComponent} from "./view/modules/member/member.component";
import {SandahComponent} from "./view/modules/sandah/sandah.component";
import {CountByMsjTypeComponent} from "./report/view/countbymsjtype/countbymsjtype.component";
import {SermonComponent} from "./view/modules/sermon/sermon.component";
import {EventComponent} from "./view/modules/event/event.component";
import {ReceiveComponent} from "./view/modules/receive/receive.component";
import {SalahtimeService} from "./service/salahtimeservice";
import {SalahtimeComponent} from "./view/modules/salahtime/salahtime.component";
import {CountByMsjComponent} from "./report/view/countbymsj/countbymsj.component";
import {CountbymsjCityComponent} from "./report/view/countbymsjcity/countbymsjcity.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: 'login', pathMatch: 'full'},

  {
    path: "main",
    component: MainwindowComponent,
    children: [
      {path: "home", component: HomeComponent},
      {path: "employee", component: EmployeeComponent},
      {path: "user", component: UserComponent},
      {path:"reports", component: ArrearsByProgramComponent},
      {path: "home/payments", redirectTo: 'payments', pathMatch: 'full'},
      {path:"batchregistration",component:BatchregistrationComponent},
      {path: "home/batchregistration", redirectTo: 'batchregistration', pathMatch: 'full'},
      {path:"students",component:StudentComponent},
      {path: "home/students", redirectTo: 'students', pathMatch: 'full'},
      {path:"class",component:ClassComponent},
      {path: "home/class", redirectTo: 'class', pathMatch: 'full'},
      {path:"books",component:BookdistributionComponent},
      {path: "home/books", redirectTo: 'books', pathMatch: 'full'},
      {path:"attendance",component:AttendanceComponent},
      {path: "home/attendance", redirectTo: 'attendance', pathMatch: 'full'},
      {path:"masjid",component:MasjidComponent},
      {path: "home/masjid", redirectTo: 'masjid', pathMatch: 'full'},
      {path: "countbymsjtype", component:CountByMsjTypeComponent},
      {path: "countbymsjcity", component:CountbymsjCityComponent },
      {path: "countbydesignation", component:CountByDesignationComponent},
      {path: "house",component:HouseComponent},
      {path: "member",component:MemberComponent},
      {path: "sandah",component:SandahComponent},
      {path: "home/member", redirectTo: 'member', pathMatch: 'full'},
      {path: "sermon",component:SermonComponent},
      {path: "home/sermon", redirectTo: 'sermon', pathMatch: 'full'},
      {path: "event",component:EventComponent},
      {path: "home/event", redirectTo: 'event', pathMatch: 'full'},
      {path: "receive",component:EventComponent},
      {path: "home/receive", redirectTo: 'receive', pathMatch: 'full'},
      {path: "salahtime",component:SalahtimeComponent},
      {path: "housecount",component:CountByMsjComponent},
      {path: "home/salahtime", redirectTo: 'salahtime', pathMatch: 'full'},

    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
