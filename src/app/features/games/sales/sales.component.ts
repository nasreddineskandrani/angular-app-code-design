import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit {
  selectedDate: Date;

  constructor() {}

  ngOnInit(): void {
  }

  onDateSelectionChange(date: Date): void {
    this.selectedDate = date;
  }
}
