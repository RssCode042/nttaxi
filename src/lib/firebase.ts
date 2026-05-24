/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestore-errors';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const trackVisit = async (page: string) => {
  const date = new Date().toISOString().split('T')[0];
  const analyticsRef = doc(db, 'analytics', date);
  const pageKey = page.replace(/\//g, '_') || 'home';
  
  try {
    await updateDoc(analyticsRef, {
      totalVisits: increment(1),
      [`pages.${pageKey}`]: increment(1)
    });
  } catch (e) {
    // If doc doesn't exist, try setDoc
    try {
      await setDoc(analyticsRef, {
        totalVisits: 1,
        pages: { [pageKey]: 1 }
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `analytics/${date}`);
    }
  }
};
