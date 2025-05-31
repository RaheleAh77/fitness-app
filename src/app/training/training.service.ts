import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'کرانچ', duration: 30, calories: 8 },
    { id: 'squat', name: 'اسکوات', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'لانچ اسکوات', duration: 120, calories: 18 },
    { id: 'burpees', name: 'شنا', duration: 60, calories: 8 },
  ];

  private exercises: Exercise[] = [];

  private runningExercise!: Exercise | null;

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    )!;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise!,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise!,
      date: new Date(),
      state: 'canceled',
      duration: this.runningExercise?.duration! * (progress / 100),
      calories: this.runningExercise?.calories! * (progress / 100),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompleteOrCancelExercises() {
    return [...this.exercises];
  }
}
