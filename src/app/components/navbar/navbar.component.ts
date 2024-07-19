import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  route=inject(Router)

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

  getHome(){
    this.route.navigateByUrl("/")
  }



  async getShowWorkouts(){
    this.route.navigateByUrl("/workouts")

  }

  async getWorkoutCharts(){
    this.route.navigateByUrl("/showchart")

  }

  ClearWorkouts(){
    localStorage.clear();
  }

  generateDummyData(){
    localStorage.setItem("UserData",JSON.stringify(this.dummyData))
  }

}
