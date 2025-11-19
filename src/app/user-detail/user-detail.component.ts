import { Component } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditBasicComponent } from '../dialog-edit-basic/dialog-edit-basic.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    AsyncPipe,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId!: string;
  user$!: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {
    // 1. ID aus URL holen
    this.userId = this.route.snapshot.paramMap.get('id')!;

    // 2. docRef user
    const userDocRef = doc(this.firestore, `users/${this.userId}`);

    // 3. user$ Observable mit docData befüllen
    this.user$ = docData(userDocRef, { idField: 'id' }) as Observable<User>;
  }

  editBasicInfo() {
    const dialog = this.dialog.open(DialogEditBasicComponent, {
      data: {
        user$: this.user$,
      },
    });
  }

  editAdress() {
    this.dialog.open(DialogEditAddressComponent, {
      data: {
        user$: this.user$,
      },
    });
  }
}
