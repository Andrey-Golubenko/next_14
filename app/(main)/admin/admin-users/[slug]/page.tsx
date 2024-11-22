import { getUserById } from '~/services/user'
import EditUserPageView from '~/views/EditUserPageView'

interface IEditUserPageProps {
  params: {
    slug: string
  }
}

const EditUserPage = async ({ params: { slug } }: IEditUserPageProps) => {
  const userId = slug?.split('-')?.pop() ?? ''

  const user = await getUserById(userId)

  return <EditUserPageView user={user} />
}

export default EditUserPage