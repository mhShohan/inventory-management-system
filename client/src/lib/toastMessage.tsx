import Swal, { SweetAlertOptions } from 'sweetalert2';

const toastMessage = (props: SweetAlertOptions) => {
  Swal.fire(props);
};

export default toastMessage;
