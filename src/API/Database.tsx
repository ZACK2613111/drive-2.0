import { database } from "~/firebaseConfig"
import { ref, push, remove } from "firebase/database"

// Initialize Realtime Database reference
let filesRef = ref(database, 'files')

export const addFiles = (imageLink: string, imageName:string) => {
    try {
        // Push data to the 'files' collection
        push(filesRef, {
            imageLink: imageLink || null,
            imageName : imageName || null,
        }); 
    } catch (error) {
        console.log(error);
    }
};

// Delete a file by its key from the 'files' collection
export const deleteFile = (fileKey: string) => {
    try {
        const fileToDeleteRef = ref(database, fileKey);
        remove(fileToDeleteRef)
            .then(() => {
                console.log(`File with key ${fileKey} deleted successfully.`);
            })
            .catch((error) => {
                console.error(`Error deleting file with key ${fileKey}:`, error);
            });
    } catch (error) {
        console.log(error);
    }
};


export const getFiles = () => {

}
