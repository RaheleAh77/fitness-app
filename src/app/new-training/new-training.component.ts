import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter<void>();
  sportControl = new FormControl(null, Validators.required);

  exercises!: Exercise[];
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }
  onStartTraining() {
    this.trainingStart.emit();
  }
}
