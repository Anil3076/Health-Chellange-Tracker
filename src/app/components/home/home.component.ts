import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = 'SPA';
  inputName = ""
  workoutCategory = "Choose Workout"
  inputDuration = "";
  isDataValid = false;
  isDataDuplicate = false;
  isWorkoutDataDuplicate = false;

  workouts = [
    "Cycling",
    "Running",
    "Swimming",
    "Yoga"
  ];



  ngOnInit() {

  }



  //This function checks if entered data is valid or not and if data is not valid it set's the boolean isDataValid to True or False
  DataValidation() {
    if (this.inputName != "" && this.workoutCategory != "Choose Workout" && this.inputDuration != "") {

      if (!isNaN(Number(this.inputDuration))) {
        this.isDataValid = true;
      }
    }
  }


  async HandleData() {
    // localStorage.clear()
    //Calling Datavalidation Function
    this.DataValidation();

    //if enterd data is valid this will execute
    if (this.isDataValid) {
      let currentData = localStorage.getItem("UserData")




      if (currentData == null) {
        const UserData = [{
          name: this.inputName,
          workouts: [{ workout: this.workoutCategory, duration: this.inputDuration }]
        }]

        localStorage.setItem("UserData", JSON.stringify(UserData))
      }
      else {

        let fetchData = await JSON.parse(currentData)
       
        let currentDataIndex;
        for (let i = 0; i < fetchData.length; i++) {
          if (fetchData[i].name == this.inputName) {
            currentDataIndex = fetchData.indexOf(fetchData[i]);
            this.isDataDuplicate = true;
          }
        }

        if (this.isDataDuplicate) {
          
          const UserData = []

          for (let i = 0; i < fetchData.length; i++) {
            UserData.push(fetchData[i]);
          }


          //getting index of duplicate workout data
          let index;
          for (let i = 0; i < UserData[currentDataIndex].workouts.length; i++) {
            if (UserData[currentDataIndex].workouts[i].workout == this.workoutCategory) {
              index = UserData[currentDataIndex].workouts.indexOf(UserData[currentDataIndex].workouts[i])
              this.isWorkoutDataDuplicate = true;
            }
          }

          //id duplicate data is found this will execute
          if (this.isWorkoutDataDuplicate == true) {
            UserData[currentDataIndex].name = this.inputName;
            UserData[currentDataIndex].workouts[index].workout = this.workoutCategory;
            UserData[currentDataIndex].workouts[index].duration = this.inputDuration;
            localStorage.setItem("UserData", JSON.stringify(UserData))

          }//if unique data is found this will execute
          else {
            UserData[currentDataIndex].name = this.inputName;
            UserData[currentDataIndex].workouts.push({ workout: this.workoutCategory, duration: this.inputDuration })

            localStorage.setItem("UserData", JSON.stringify(UserData))
          }
        }
        else {

          const UserData = []

          for (let i = 0; i < fetchData.length; i++) {
            UserData.push(fetchData[i]);
          }

          const newData = {
            name: this.inputName,
            workouts: [{ workout: this.workoutCategory, duration: this.inputDuration }]
          }

          UserData.push(newData)
          localStorage.setItem("UserData", JSON.stringify(UserData))
        }




      }
      //reseting the values
      this.inputName = "";
      this.workoutCategory = "Choose Workout"
      this.inputDuration = "";
      this.isDataValid = false;
      this.isDataDuplicate = false;
      this.isWorkoutDataDuplicate = false;
    }//if data is not valid this will execute and show a alert
    else {
      alert("please enter correct data")
    }
  }
}
