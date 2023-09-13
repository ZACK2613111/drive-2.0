import { onValue, ref, off } from 'firebase/database'; // Import the necessary Firebase Realtime Database functions
import React, { useEffect, useState } from 'react';
import { database } from '~/firebaseConfig';

// Define a type for the structure of your file objects
type FileObject = {
  imageLink: string;
  id: string;
};

export const fetchFiles = () => {
    // State to store the list of files
    const [fileList, setFileList] = useState<FileObject[]>([]);

    useEffect(() => {
        // Initialize Realtime Database reference to the 'files' collection
        const filesRef = ref(database, 'files');
        
        // Create an event listener for real-time updates
        const listener = onValue(filesRef, (snapshot) => {
            // This callback will be called whenever the 'files' collection is updated
            
            // Map the snapshot to an array of FileObject
            const mappedData: FileObject[] = [];
            snapshot.forEach((childSnapshot) => {
                // Get data from each child snapshot and include its key (id)
                const data = childSnapshot.val();
                const id = childSnapshot.key;
                mappedData.push({ ...data, id });
            });
            
            // Log the mapped data to the console
            console.log(mappedData);
            
            // Update the state with the mapped data
            setFileList(mappedData); 
        });

        // Clean up the listener when the component unmounts
        return () => {
            off(filesRef, 'value', listener); // Remove the event listener
        };
    }, []); // Empty dependency array means this effect runs once on component mount

    // Return the fileList state for use in your component
    return { fileList };
}
