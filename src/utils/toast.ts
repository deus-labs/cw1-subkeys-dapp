import { toast as Toast, ToastOptions } from "react-toastify"

const config: ToastOptions = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  position: "top-center",
}

function info(message: string, duration = 3000) {
  Toast.info(message, {
    ...config,
    autoClose: duration,
  })
}

function warn(message: string, duration = 3000) {
  Toast.warn(message, {
    ...config,
    autoClose: duration,
  })
}

function success(message: string, duration = 3000) {
  Toast.success(message, {
    ...config,
    autoClose: duration,
  })
}

function error(message: string, duration = 3000) {
  Toast.error(message, {
    ...config,
    autoClose: duration,
  })
}

function promise(
  callback: any,
  pendingMessage: string,
  successMessage: string,
  errorMessage: string,
  duration = 3000
) {
  Toast.promise(
    callback,
    {
      pending: pendingMessage,
      success: successMessage,
      error: errorMessage,
    },
    { ...config, autoClose: duration }
  )
}

const toast = {
  info,
  success,
  warn,
  error,
  promise,
}

export default toast
