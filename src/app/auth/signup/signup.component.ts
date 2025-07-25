import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadingStateSubs!: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) {}

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }

  ngOnInit() {
    this.loadingStateSubs = this.uiService.loadingState.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
  }
  ngOnDestroy() {
    this.loadingStateSubs.unsubscribe();
  }
}
