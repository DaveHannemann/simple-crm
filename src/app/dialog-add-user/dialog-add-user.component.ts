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
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  loading: boolean = false;
  user = new User();
  birthDate: Date = new Date();
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestore: Firestore
  ) {}

  async save() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('User saved:', this.user);
    this.loading = true;

    const usersRef = collection(this.firestore, 'users');

    await addDoc(usersRef, this.user.toJSON())
      .then(() => {
        this.loading = false;
        console.log('User added to Firestore');
        this.dialogRef.close();
      })
      .catch((err) => console.error('Error adding user:', err));
  }
}
