import { Component } from "@angular/core";
import { ChartHistoryService } from "../+shared/chart-history/chart-history.service";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html"
})
export class SalesComponent {
  selectedDate: Date;

  constructor(private salesHistoryService: ChartHistoryService) {}

  ngOnInit() {
    this.selectedDate = this.salesHistoryService.selectedDate;
  }

  onDateSelectionChange(date: Date) {
    this.selectedDate = date;
  }
}
