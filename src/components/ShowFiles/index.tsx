import React, { useEffect, useState } from 'react';
import styles from './showfiles.module.scss';
import { fetchFiles } from '~/hooks/fetchFiles';

export default function ShowFiles() {
    let { fileList } = fetchFiles(); // Call fetchFiles to get fileList

    const openFile = (fileLink : string) =>{
        window.open(fileLink)
    }

    return (
        <div className={styles.filesGrid}>
            {fileList.map((file) => {
                return (
                    <div key={file.id}>
                        <div className={`${styles.files}`} onClick={()=>openFile(file.imageLink)} >
                        </div>
                        <img className={styles.imageLink} src={file.imageLink} alt={`Image ${file.id}`} />
                    </div>
                );
            }) }
        </div>
    );
}
