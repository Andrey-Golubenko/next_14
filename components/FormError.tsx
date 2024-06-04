import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface IFormErrorProps {
  message?: string
}

const FormError = ({ message }: IFormErrorProps) => {
  if (!message) return null

  return (
    <div className=" flex items-center gap-x-2 bg-destructive/15 p-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="h4 w-4" />
      <p>{message}</p>
    </div>
  )
}
export default FormError