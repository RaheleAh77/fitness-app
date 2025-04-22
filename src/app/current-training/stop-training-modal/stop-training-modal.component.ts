import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training-modal',
  templateUrl: './stop-training-modal.component.html',
  styleUrls: ['./stop-training-modal.component.css']
})
export class StopTrainingModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {value: string}) { }
}
