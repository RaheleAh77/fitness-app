import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter<void>();
  sportControl = new FormControl(null, Validators.required);
  onStartTraining() {
    this.trainingStart.emit();
  }
}
