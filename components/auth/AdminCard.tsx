'use client'

import { UserRole } from '@prisma/client'
import { toast } from 'sonner'

import FormSuccess from '~/components/FormSuccess'
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import RoleGate from '~/components/auth/RoleGate'
import AdminCardItem from '~/components/auth/AdminCardItem'
import { PATHS } from '~/utils/constants/constants'
import { admin } from '~/actions/admin'

const AdminCard = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success, {
          richColors: true,
          closeButton: true
        })
      }

      if (data.error) {
        toast.error(data.error, {
          richColors: true,
          closeButton: true
        })
      }
    })
  }

  const onApiRouteClick = () => {
    fetch(PATHS.apiAdmin).then((response) => {
      if (response.ok) {
        toast.success('Allowed API Route!', {
          richColors: true,
          closeButton: true
        })
      } else {
        toast.error('Forbidden API Route!', {
          richColors: true,
          closeButton: true
        })
      }
    })
  }

  return (
    <Card className="flex min-h-[420px] flex-col">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🔑 Admin</p>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-evenly space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <AdminCardItem
          label="Admin-only API Route"
          handleClick={onApiRouteClick}
        />
        <AdminCardItem
          label="Admin-only Server Action"
          handleClick={onServerActionClick}
        />
      </CardContent>
    </Card>
  )
}

export default AdminCard
