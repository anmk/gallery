import { useState, useEffect } from 'react';
import fbase from '../firebase';

function useStorageUpload() {
  const [dataResponse, setDataResponse] = useState();
  const [fileData, setFileData] = useState();
  const [progress, setProgress] = useState(null);

  const setUp = (_value) => {
    const fName = `${new Date().getTime()}-${_value.name}`;
    const ref = fbase.storage().ref(`images/${fName}`);
    return ref.put(_value);
  };

  useEffect(() => {
    let didCancel = false;

    const uploadData = async () => {
      setProgress({ value: 0 });
      const uploadTask = setUp(fileData);
      uploadTask.on(
        fbase.storage.TaskEvent.STATE_CHANGED,
        (_progress) => {
          const value = _progress.bytesTransferred / _progress.totalBytes;
          setProgress({ value });
        },
        (_error) => {
          console.error('Error: ', _error);
        },
        async () => {
          const unsubscribe = await uploadTask.snapshot.ref.getDownloadURL();
          setDataResponse({
            metaData: uploadTask.snapshot.metadata,
            downloadUrl: unsubscribe,
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
