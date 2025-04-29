import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'کرانچ', duration: 30, calories: 8 },
    { id: 'squat', name: 'اسکوات', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'لانچ اسکوات', duration: 120, calories: 18 },
    { id: 'burpees', name: 'شنا', duration: 60, calories: 8 },
  ];

  private runningExercise!: Exercise;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    )!;
    console.log({ ...this.runningExercise });
    this.exerciseChanged.next({ ...this.runningExercise });
  }
}
