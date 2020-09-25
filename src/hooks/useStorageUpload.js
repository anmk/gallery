import { useState, useEffect } from 'react';
import fbase from '../firebase';

function useStorageUpload() {
  const [dataResponse, setDataResponse] = useState();
  const [fileData, setFileData] = useState();
  const [progress, setProgress] = useState(null);

  const setUp = (value) => {
    const fName = `${new Date().getTime()}-${value.name}`;
    const refer = fbase.storage().ref(`images/${fName}`);
    return refer.put(value);
  };

  useEffect(() => {
    let didCancel = false;

    const uploadData = async () => {
      setProgress({ pValue: 0 });
      const uploadTask = setUp(fileData);
      const fullPath = uploadTask.location_.path;
      const nameInStorage = fullPath.substr(7);
      uploadTask.on(
        fbase.storage.TaskEvent.STATE_CHANGED,
        (progressV) => {
          const pValue = progressV.bytesTransferred / progressV.totalBytes;
          setProgress({ pValue });
        },
        (err) => {
          console.error('Error: ', err);
        },
        async () => {
          const unsubscribe = await uploadTask.snapshot.ref.getDownloadURL();
          setDataResponse({
            metaData: uploadTask.snapshot.metadata,
            downloadUrl: unsubscribe,
            nameInStorage,
          });
          setProgress(null);
          return () => unsubscribe();
        },
      );
    };

    if (!didCancel) {
      if (fileData) uploadData();
    }

    return () => {
      didCancel = true;
    };
  }, [fileData]);

  return {
    dataResponse,
    progress,
    setFileData,
  };
}

export default useStorageUpload;
