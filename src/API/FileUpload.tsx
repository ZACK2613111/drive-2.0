import { storage } from "~/firebaseConfig"; // Assuming you only need Firebase Storage
import { ref, getDownloadURL, uploadBytesResumable, UploadTaskSnapshot } from "firebase/storage";
import { addFiles } from "~/API/Database";

export const fileUpload = (file: File, setProgress: Function) => {
  // 1. Create a reference to the desired location in Firebase Storage
  const storageRef = ref(storage, `files/${file.name}`);

  // 2. Initiate the upload and get an UploadTask
  const uploadTask = uploadBytesResumable(storageRef, file);

  // 3. Set up an event listener for tracking the upload progress
  uploadTask.on(
    "state_changed",
    (snapshot: UploadTaskSnapshot) => {
      // 4. Calculate and log the upload progress as a percentage
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      ) ;
      console.log(`Upload is ${progress}% complete`);
      setProgress(progress);
    },
    (error) => {
      // 5. Handle upload errors
      alert(`Upload error: ${error.message}`);
    },
    () => {
      // 6. Handle upload completion and get the download URL
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          // 7. After successful upload, add the download URL and fileName to your Firestore or database
          const fileName = file.name; // Use the file's name as the fileName
          addFiles(downloadURL, fileName);
        })
        .catch((error) => {
          // 8. Handle errors while getting the download URL
          console.error(`Error getting download URL: ${error}`);
        });
    }
  );
};
