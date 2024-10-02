import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { userQueryOptions } from '../../lib/api'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions)
  if (error) return 'Not Logged in'
  if (isPending) return 'Loading.....'
  return (
    <div>
      <p>Hello {data.user.family_name}</p>
      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}
