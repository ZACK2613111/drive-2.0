import React, { ChangeEvent, useState } from "react";
import styles from "./Upload.module.scss";
import Button from "../common/Button/Button";
import CommonProgress from "../common/Progress";
import { useFetchSession } from "~/hooks/useSession";
import { fileUpload } from "~/API/FileUpload";
import ShowFiles from "../ShowFiles";
import { addFolder } from "~/API/Database";
export default function UploadFiles() {
  // Fetch the user's session (assuming it contains authentication information)
  let { session } = useFetchSession();

  // State variables to manage visibility and progress
  const [isFileVisible, setFileVisible] = useState(false);
  const [isFolderVisible, setFolderVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [folderName, setFolderName] = useState('')



  // Function to handle file upload
  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the selected file from the input element
    const file = event.target.files?.[0]; // 'file' may be undefined if no file is selected
    if (file) {
      // Ensure 'file' is not undefined
      // Call the 'fileUpload' function to upload the selected file
      fileUpload(file, setProgress);
    }
  };


  const uploadFolder = () => {
    let payload = {
      folderName : folderName,
      isFolder : true,
      fileList : [],
    }

    addFolder(payload)
    setFolderName("")
  }

  return (
    <div className={styles.uploadMain}>
      {/* Button to toggle file input visibility */}
      <Button
        onClick={() => {
          setFolderVisible(false)
          setFileVisible(!isFileVisible);
        }}
        title="Add a File"
        btnClass="btn-success"
      />
      {isFileVisible ? (
        // Input element for selecting a file
        <input
          onChange={(event) => uploadFile(event)}
          type="file"
          className="file-input w-full max-w-xs"
          
        />
      ) : (
        <></>
      )}

     

      {/* Button to create folder */}
      <Button
        onClick={()=> {
          setFileVisible(false)
          setFolderVisible(!isFolderVisible)
        }}
        title="Add Folder"
        btnClass="btn-success"
      />

      { isFolderVisible ?(
            <>
                <input type="text" placeholder="Type here your folder name" value={folderName} onChange={(event)=> {setFolderName(event.target.value)}} className="input input-bordered input-accent w-full max-w-xs" />
                <Button
                  onClick={uploadFolder}
                  title="Create a Folder"
                  btnClass="btn-success"
      />
            </>
      )
      : <></>} 
      {/* Display upload progress if progress is not 0 or 100 */}
      {progress === 0 || progress === 100 ? (
        <></>
      ) : (
        <CommonProgress progress={progress} />
      )}

      {/* Component to show uploaded files */}
      <ShowFiles />
    </div>
  );
}
 