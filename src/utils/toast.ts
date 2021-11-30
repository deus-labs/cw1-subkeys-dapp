import { toast as Toast, ToastOptions } from "react-toastify"

const config: ToastOptions = {
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  position: "top-center",
}

export function infoToast(message: string, duration = 3000) {
  Toast.info(message, {
    ...config,
    autoClose: duration,
  })
}

export function warnToast(message: string, duration = 3000) {
  Toast.warn(message, {
    ...config,
    autoClose: duration,
  })
}

export function successToast(message: string, duration = 3000) {
  Toast.success(message, {
    ...config,
    autoClose: duration,
  })
}

export function errorToast(message: string, duration = 3000) {
  Toast.error(message, {
    ...config,
    autoClose: duration,
  })
}

export function promiseToast(
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
