import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export async function getNextTaskNumber(): Promise<string> {
  const counterRef = doc(db, "counters", "tasks");

  return await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);

    const currentYear = new Date().getFullYear();

    let lastNumber = 0;
    let year = currentYear;

    if (!counterDoc.exists()) {
      transaction.set(counterRef, {
        year: currentYear,
        lastNumber: 1,
      });

      return `${currentYear}0001`;
    }

    const data = counterDoc.data();

    year = data.year;
    lastNumber = data.lastNumber;

    // New Year হলে Counter Reset
    if (year !== currentYear) {
      year = currentYear;
      lastNumber = 1;
    } else {
      lastNumber++;
    }

    transaction.update(counterRef, {
      year,
      lastNumber,
    });

    return `${year}${lastNumber
      .toString()
      .padStart(4, "0")}`;
  });
}