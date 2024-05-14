import { useToast } from 'vue-toast-notification';

class ToastComponent {
  constructor (message, position) {
    this.toast = useToast();
    this.message = message;
    this.position = position;
  }

  success() {
    this.toast.open({
      message: this.message,
      type: 'success',
      duration: 3000,
      dismissable: true,
      position: this.position,
    })
  }

  warning() {
    this.toast.open({
      message: this.message,
      type: 'warning',
      duration: 3000,
      dismissable: true,
      position: this.position,
    })
  }

  danger() {
    this.toast.open({
      message: this.message,
      type: 'error',
      duration: 3000,
      dismissable: true,
      position: this.position,
    })
  }

  info() {
    this.toast.open({
      message: this.message,
      type: 'info',
      duration: 3000,
      dismissable: true,
      position: this.position,
    })
  }
}

export default ToastComponent;
