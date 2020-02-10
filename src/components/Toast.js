import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastError = msg => {
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const ToastSuccess = msg => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
