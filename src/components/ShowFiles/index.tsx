import React from 'react';
import styles from './showfiles.module.scss';
import { fetchFiles } from '~/hooks/fetchFiles';
import {
  FaFilePdf,
  FaFileImage,
  FaFileCode,
  FaFile,
  FaFileExcel,
  FaFolder,
} from 'react-icons/fa';

type FileExtension =
  | 'pdf'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'txt'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx';

export default function ShowFiles() {
  const { fileList } = fetchFiles();

  const getFileIcon = (fileName: string | undefined): JSX.Element => {
    if (!fileName || typeof fileName !== 'string' || !fileName.includes('.')) {
      return <FaFile />;
    }

    const extension = (fileName.split('.').pop() || '') as FileExtension;

    const iconMap: Record<FileExtension, JSX.Element> = {
      pdf: <FaFilePdf color='red' />,
      jpg: <FaFileImage color='blue' />,
      jpeg: <FaFileImage color='blue' />,
      png: <FaFileImage color='blue' />,
      gif: <FaFileImage color='blue' />,
      txt: <FaFileCode color='purple' />,
      doc: <FaFile color='cyan' />,
      docx: <FaFile color='cyan' />,
      xls: <FaFileExcel color='green' />,
      xlsx: <FaFileExcel color='green' />,
    };

    if (iconMap.hasOwnProperty(extension)) {
      return iconMap[extension];
    } else {
      return <FaFile />;
    }
  };

  const openFile = (fileLink: string) => {
    window.open(fileLink);
  };

  return (
    <div className={styles.filesGrid}>
      {fileList.map(
        (file: {
          fileLink: string;
          fileName: string;
          isFolder: boolean;
          folderName?: string;
          id: string;
        }) => (
          <div
            key={file.id}
            className={styles.fileCard}
            onClick={() => openFile(file.fileLink)}
          >
            {file.isFolder ? (
              <>
                <div className={styles.fileIcon}>
                  <FaFolder size={80} />
                  <p className={styles.fileName}>{file.folderName}</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.fileIcon}>
                  {getFileIcon(file.fileName)}
                </div>
              </>
            )}
          </div>
        )
      )}
    </div>
  );
}
