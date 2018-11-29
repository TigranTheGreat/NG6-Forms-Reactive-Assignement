import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectNameList = ['Test'];

  constructor() {
    this.form = new FormGroup({
      projectName: new FormControl(null, [Validators.required, this.forbiddenProjectNames.bind(this)], [this.forbiddenProjectNamesAsync.bind(this)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl()
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  forbiddenProjectNames(control: FormControl) : { [key: string]: boolean } {
    if (this.forbiddenProjectNameList.includes(control.value)) {
      return { 'projectNameIsForbidden': true };
    }

    return null;
  }

  forbiddenProjectNamesAsync(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectNameList.includes(control.value)) {
          resolve({ 'projectNameIsForbiddenAsync': true });
        } else {
          resolve(null);
        }
      }, 1500)
    });

    return promise;
  }
}
