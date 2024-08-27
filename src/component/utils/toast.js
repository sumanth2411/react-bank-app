import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successToast = (message) => {
  toast.success(message, {
    position: "top-right", 
    autoClose: 3000,
  });
};

export const errorToast = (message) => {
  toast.error(message, {
    position: "top-right", 
    autoClose: 1000,
  });
};
