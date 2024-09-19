import { Toaster, toast } from 'sonner'

export const successToast = (message: string) => {
	toast.success(message)
}

export const errorToast = (message: string) => {
	toast.error(message)
}

export const ToasterComponent = () => {
	return <Toaster richColors position='top-center' expand />
}
