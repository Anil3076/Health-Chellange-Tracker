import { AfterViewInit, Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-show-workouts',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './show-workouts.component.html',
  styleUrl: './show-workouts.component.scss'
})
export class ShowWorkoutsComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Workouts', 'NumberofWorkouts', 'TotalWorkoutMinutes'];
  searchQuery = '';
  filterCatogary = "All"
  tempData: any = []
  wholeData: any = []
  pageCount = 0;
  currentPage = 1;
  dataLength = 0;
  from = 0;
  to = 5;

  workouts = [
    "Cycling",
    "Running",
    "Swimming",
    "Yoga"
  ];


  async onPageLoad() {
    let ud: any = localStorage.getItem("UserData")
    let getData = await JSON.parse(ud)


    for (let i = 0; i < getData.length; i++) {

      let workouts = [];
      let workoutminutes = 0;
      for (let j = 0; j < getData[i].workouts.length; j++) {
        workouts.push(getData[i].workouts[j].workout);
        workoutminutes += parseInt(getData[i].workouts[j].duration);

      }

      this.tempData.push({ "Name": getData[i].name, "Workouts": workouts, "NumberofWorkouts": getData[i].workouts.length, "TotalWorkoutMinutes": workoutminutes })

    }

    this.dataLength = this.tempData.length
    this.wholeData = this.tempData.slice(0, 5)
  }

  HandlePagination(from: Number, to: Number, dataSource: any) {

    this.pageCount = dataSource.length;
    this.pageCount /= 5;
    if (this.pageCount / 5 != 0) {
      this.pageCount = Math.ceil(this.pageCount)
    }


    this.wholeData = this.tempData.slice(from, to)
  }

  ngOnInit(): void {
    this.onPageLoad();
  }


  filterWorkouts() {
    let filteredData: any = this.tempData;
    this.wholeData = [];
    if (this.filterCatogary !== 'All') {
      filteredData = filteredData.filter((item: any) => item.Workouts.includes(this.filterCatogary));
    }

    if (this.searchQuery) {
      filteredData = filteredData.filter((item: any) =>
        item.Name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.dataLength = filteredData.length

    this.HandlePagination(this.from, this.to, filteredData)

    this.wholeData = filteredData.slice(0, 5)



  }




  next() {

    if (this.currentPage != this.pageCount) {
      this.from = this.to;
      this.to += 5;
      this.HandlePagination(this.from, this.to, this.wholeData)
      this.currentPage += 1;
      console.log(this.currentPage);

    }

  }
  previous() {
    if (this.currentPage != 1) {
      this.to = this.from;
      this.from -= 5;
      this.currentPage -= 1;
      this.HandlePagination(this.from, this.to, this.wholeData)
      console.log(this.currentPage);

    }


  }





}




