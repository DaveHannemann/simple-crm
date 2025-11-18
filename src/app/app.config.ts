import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-de079',
        appId: '1:339795229484:web:f60e322c1f5ebefda5ca89',
        storageBucket: 'simple-crm-de079.firebasestorage.app',
        apiKey: 'AIzaSyASURAhkNJZs6wPftmGrQlfGks1fzpVv7s',
        authDomain: 'simple-crm-de079.firebaseapp.com',
        messagingSenderId: '339795229484',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
};
