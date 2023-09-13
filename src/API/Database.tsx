import { database } from "~/firebaseConfig"
import { ref, push, remove } from "firebase/database"

let filesRef = ref(database, 'files')

export const addFiles = (fileLink: string, fileName:string) => {
    try {
        push(filesRef, {
            fileLink: fileLink ,
            fileName : fileName,
            isFolder: false,
        }); 
    } catch (error) {
        console.log(error);
    }
};

export const addFolder = (payload:{ folderName:string, isFolder:boolean, fileList:object}) => {
    try {
        push(filesRef, {
            folderName: payload.folderName ,
            fileList : payload.fileList,
            isFolder: payload.isFolder,
        }); 
    } catch (error) {
        console.log(error);
    }
};





