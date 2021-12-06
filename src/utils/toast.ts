import { toast as Toast, ToastOptions } from "react-toastify"

const config: ToastOptions = {
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  position: "top-left",
  autoClose: false,
  style: { width: "fit-content" },
}

export function infoToast(message: string) {
  Toast.info(message, {
    ...config,
  })
}

export function warnToast(message: string) {
  Toast.warn(message, {
    ...config,
  })
}

export function successToast(message: string) {
  Toast.success(message, {
    ...config,
  })
}

export function errorToast(message: string) {
  Toast.error(message, {
    ...config,
  })
}

export function promiseToast(
  callback: any,
  pendingMessage: string,
  successMessage: string,
  errorMessage: string
) {
  Toast.promise(
    callback,
    {
      pending: pendingMessage,
      success: successMessage,
      error: errorMessage,
    },
    { ...config }
  )
}
