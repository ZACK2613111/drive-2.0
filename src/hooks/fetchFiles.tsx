import { onValue, ref, off } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '~/firebaseConfig';

type FileObject = {
  fileLink: string;
  fileName: string;
  id: string;
  isFolder: boolean;
  folderName?: string;
};

export const fetchFiles = () => {
  const [fileList, setFileList] = useState<FileObject[]>([]);

  useEffect(() => {
    const filesRef = ref(database, 'files');

    const listener = onValue(filesRef, (snapshot) => {
      const mappedData: FileObject[] = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const id = childSnapshot.key;
        mappedData.push({ ...data, id, fileName: data.fileName, fileLink: data.fileLink });
      });

      setFileList(mappedData);
    });

    return () => {
      off(filesRef, 'value', listener);
    };
  }, []);

  return { fileList };
};
