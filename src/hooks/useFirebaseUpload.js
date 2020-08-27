import { useState, useEffect } from 'react';
import fbase from '../firebase';

function useFirebaseUpload() {
  const [dataResponse, setDataResponse] = useState();
  const [fileData, setFileData] = useState();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const setUp = (_value) => {
      const fName = `${new Date().getTime()}-${_value.name}`;
      const ref = fbase.storage().ref(`images/${fName}`);
      return ref.put(_value);
    };

    const uploadData = async () => {
      setProgress({ value: 0 });
      const uploadTask = setUp(fileData);

      try {
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
            const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
            setDataResponse({
              metaData: uploadTask.snapshot.metadata,
              downloadUrl,
            });

            setProgress(null);
          },
        );
      } catch (_error) {
        // console.error('Error: ', _error);
      }
    };

    if (fileData) uploadData();
  }, [fileData]);

  return {
    dataResponse,
    progress,
    setFileData,
  };
}
export default useFirebaseUpload;
