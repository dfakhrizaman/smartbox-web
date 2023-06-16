import { db } from "@/firebase";
import { onValue, ref, set } from "firebase/database";

export const writeToDatabase = (route: string, payload: any) => {
  set(ref(db, `${route}`), payload);
};

export const readDatabase = async (onRead: (newValue: any) => void) => {
  onValue(ref(db), (snapshot) => {
    const data = snapshot.val();

    if (data !== null) {
      onRead(data);
      return Object.values(data);
    }
  });
};
