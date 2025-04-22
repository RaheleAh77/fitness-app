import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { StopTrainingModalComponent } from './stop-training-modal/stop-training-modal.component';

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
  @Output() dialogEvent = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.timer = setInterval(() => {
      this.value += 5;
      if (this.value >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingModalComponent, {
      data: { value: this.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogEvent.emit();
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
