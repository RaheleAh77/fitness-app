import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Exercise } from '../training/exercise.model';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'name',
    'duration',
    'calories',
    'date',
    'state',
  ];

  constructor(
    private trainingService: TrainingService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  dataSource = new MatTableDataSource<Exercise>;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
      this.dataSource.data = this.trainingService.getCompleteOrCancelExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
