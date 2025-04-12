import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  // providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  onSubmit(contactForm: NgForm) {
    console.log(contactForm.value);
    contactForm.reset();
  }
}


