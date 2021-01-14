import { Component } from '@angular/core';
import { SalesUploadService } from './sales-upload.service';

function isDate(_date) {
  const _regExp = new RegExp(
    '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])?$'
  );
  return _regExp.test(_date);
}

@Component({
  selector: 'app-sales-upload',
  templateUrl: './sales-upload.component.html'
})
export class SalesUploadComponent {
  showUploadSection = false;

  constructor(private salesUploadService: SalesUploadService) {}

  toggleUploadSection() {
    this.showUploadSection = !this.showUploadSection;
  }

  onNewInput(e: any) {
    console.log('onNewInput', e.target.value);
    if (!isDate(e.target.value)) {
      alert('you did not enter a valid date');
      return;
    }
    const date = new Date(e.target.value);

    this.salesUploadService.notify(date);
  }
}
