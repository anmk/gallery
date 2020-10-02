import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 7000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const onUpdateBasic = (info, additionalInfo) => {
  toast(info, additionalInfo, options);
};

export const onUpdateSuccess = (info) => {
  toast.success(info, options);
};

export const onUpdateFailure = (info) => {
  toast.error(info, options);
};

export const onUpdateInfo = (info) => {
  toast.info(info, { ...options, autoClose: false });
};

export const onUpdateWarn = (info) => {
  toast.warn(info, options);
};
