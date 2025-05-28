import { Component, OnInit, ElementRef } from '@angular/core';
import { Widget, UserBalance, RevenueData, ChartType } from './default.model';
import { salesMixedChart, revenueRadialChart, userBalanceData, revenueData } from './data';
import { GeneralService } from 'src/app/core/services/general/general.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  countDoctor={"doctors":0,"users":0,"patients":0,"laboratorys":0,"mediators":0};
  breadCrumbItems: Array<{}>;

  widgetData: Widget[];
  userBalanceData: UserBalance[];
  revenueData: RevenueData[];
  salesMixedChart: ChartType;
  revenueRadialChart: ChartType;
  currentDate = new Date();
  constructor(private eref: ElementRef,private doctoService:GeneralService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'Dashboard', path: '/', active: true }];

    /**
     * fetches data
     */
    this.doctoService.getCount().subscribe((res:any)=>{
     // alert(JSON.stringify(res));
     this.countDoctor.doctors=res[0].doctors.toString();
     this.countDoctor.patients=res[0].patients.toString();
     this.countDoctor.laboratorys=res[0].laboratorys.toString();
     this.countDoctor.users=res[0].users.toString();
     this.countDoctor.mediators=res[0].mediators.toString();
     this.widgetData=[
      {
        icon: 'mdi mdi-doctor',
        color: 'primary',
        value:  res[0].doctors.toString(),
        text: 'DOCTORS'
    },
    {
        icon: 'ti-face-smile',
        color: 'success',
        value: res[0].patients.toString(),
        text: 'PATIENTS'
    },
    {
        icon: 'fe-users',
        color: 'info',
        value: res[0].users.toString(),
        text: 'USERS'
    },
    {
        icon: 'fe-server',
        color: 'success',
        value: res[0].laboratorys.toString(),
        text: 'LAB'
    },
    {
        icon: 'mdi mdi-perspective-more',
        color: 'primary',
        value: res[0].mediators.toString(),
        text: ' COORDINATORS '
    }
     ];
     // this._fetchData(res.count);
    });
    this._fetchData(null);
  }

  /**
   * fetches the dashboard value
   */
  private _fetchData(count:any) {

    this.widgetData =  [
      {
          icon: 'mdi mdi-doctor',
          color: 'primary',
          value:  this.countDoctor.doctors.toString(),
          text: 'DOCTORS'
      },
      {
          icon: 'ti-face-smile',
          color: 'success',
          value: this.countDoctor.doctors.toString(),
          text: 'PATIENTS'
      },
      {
          icon: 'fe-users',
          color: 'info',
          value: this.countDoctor.users.toString(),
          text: 'USERS'
      },
      {
          icon: 'fe-server',
          color: 'success',
          value: this.countDoctor.laboratorys.toString(),
          text: 'LAB'
      },
      {
          icon: 'mdi mdi-perspective-more',
          color: 'primary',
          value: this.countDoctor.mediators.toString(),
          text: ' COORDINATORS '
      }
  ];;
    this.salesMixedChart = {
      chart: {
          height: 370,
          type: 'line',
          padding: {
              right: 0,
              left: 0
          },
          stacked: false,
          toolbar: {
              show: false
          }
      },
      stroke: {
          width: [0, 2, 4],
          curve: 'straight'
      },
      plotOptions: {
          bar: {
              columnWidth: '50%'
          }
      },
      colors: ['#1abc9c', '#e3eaef', '#4a81d4'],
      series: [{
          name: 'CASES',
          type: 'column',
          data: [23]
      }, {
          name: 'DOCTORS',
          type: 'area',
          data: [44]
      }, {
          name: 'PATIENTS',
          type: 'line',
          data: [30]
      }],
      fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
              inverseColors: false,
              shade: 'light',
              type: 'vertical',
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
          }
      },
      // tslint:disable-next-line: max-line-length
      labels: ['01/11/2020'],
      markers: {
          size: 0
      },
      legend: {
          show: false
      },
      xaxis: {
          type: 'datetime',
          axisBorder: {
              show: false
          },
          axisTicks: {
              show: false
          }
      },
      yaxis: {
          title: {
              text: '',
          },
      },
      tooltip: {
          shared: true,
          intersect: false,
          y: {
              formatter(y) {
                  if (typeof y !== 'undefined') {
                      return y.toFixed(0) + ' points';
                  }
                  return y;
  
              }
          }
      },
      grid: {
          borderColor: '#f1f3fa'
      }
  };
  }


}
