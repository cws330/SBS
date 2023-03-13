import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createDoc = async (inputs, table) => {
  try {
    addDoc(collection(db, table), {
      ...inputs,
      timeStamp: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const queryAllDocs = async (tableName, fromData, setFromData) => {
  const q = collection(db, tableName);
  const snapShot = await getDocs(q);

  snapShot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const fetchedData = doc.data();
    const ids = doc.id;

    // console.log(doc.data());
    setFromData((fromData) => [...fromData, { id: ids, ...fetchedData }]);
  });

  return fromData;
};
export const queryAllDocsForDrawers = async (
  tableName,
  fromData,
  setFromData,
  limitNum = 50,
  orderby = { name: "timestamp", order: "desc" }
) => {
  const q = query(
    collection(db, tableName),
    orderBy(orderby.name, orderby.order),
    limit(limitNum)
  );

  const snapShot = await getDocs(q);

  snapShot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const fetchedData = doc.data();
    const ids = doc.id;

    // console.log(doc.data());
    setFromData((fromData) => [...fromData, { id: ids, ...fetchedData }]);
  });

  return fromData;
};
