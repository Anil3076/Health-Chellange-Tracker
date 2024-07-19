import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { NavbarComponent } from '../navbar/navbar.component';
import { __await } from 'tslib';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-charts',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './show-charts.component.html',
  styleUrls: ['./show-charts.component.scss']
})
export class ShowChartsComponent implements OnInit {
  userName: string = "";
  UserData: any;
  private chart: Chart | undefined; // Add a property to store the chart instance

  dummyData: any = [{
    name: "Anil Meena",
    workouts: [{ workout: "Cycling", duration: 30 }, { workout: "Running", duration: 45 }]
  }, {
    name: "Abhishek Sharma",
    workouts: [{ workout: "Cycling", duration: 30 }]
  }, {
    name: "Ravi Patil",
    workouts: [{ workout: "Yoga", duration: 30 }]
  }];

  async ShowData() {

    let getData: any = localStorage.getItem("UserData")


    let res = await JSON.parse(getData)
    this.UserData = res;
    let data: any;
    data = res[0].workouts;;
    this.userName = res[0].name + "'s Workout Progress";


    const ctx = document.getElementById('workoutchart') as HTMLCanvasElement;


    if (ctx) {

      if (this.chart) {
        this.chart.destroy();
      }


      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((row: any) => row.workout),
          datasets: [
            {
              label: 'Minutes',
              data: data.map((row: any) => row.duration)
            }
          ]
        }
      });
    }
  }

  getUser(username: any) {
    let res = this.UserData.filter((item: any) => item.name.includes(username));
    let data = res[0].workouts;
    this.userName = res[0].name + "'s Workout Progress";

    const ctx = document.getElementById('workoutchart') as HTMLCanvasElement;

    if (ctx) {

      if (this.chart) {
        this.chart.destroy();
      }


      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map((row: any) => row.workout),
          datasets: [
            {
              label: 'Minutes',
              data: data.map((row: any) => row.duration)
            }
          ]
        }
      });
    }
  }

  ngOnInit() {
    this.ShowData();
  }
}
