import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { StopTrainingModalComponent } from './stop-training-modal/stop-training-modal.component';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 0;
  timer!: any;

  constructor(public dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const increment = (this.trainingService.getRunnigExercise().duration! / 100) * 1000;
    this.timer = setInterval(() => {
      this.value += 1;
      if (this.value >= 100) {
        this.trainingService.completeExecise();
        clearInterval(this.timer);
      }
    }, increment);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingModalComponent, {
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.value);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
