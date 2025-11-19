import { Component } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-basic',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDatepickerModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './dialog-edit-basic.component.html',
  styleUrl: './dialog-edit-basic.component.scss'
})
export class DialogEditBasicComponent {
  user!: User;
  loading = false;
  birthDate: Date | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user$: Observable<User> },
    public dialogRef: MatDialogRef<DialogEditBasicComponent>,
    private firestore: Firestore
  ) {
    this.data.user$.subscribe((user) => {
      this.user = new User(user);
      this.birthDate = user.birthDate ? new Date(user.birthDate) : null;
    });
  }

  async save() {
    this.loading = true;

    const userDocRef = doc(this.firestore, `users/${this.user.id}`);

    const birthTimestamp = this.birthDate ? this.birthDate.getTime() : null;

    await updateDoc(userDocRef, {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: birthTimestamp,
    });

    this.loading = false;
    this.dialogRef.close();
  }
}
