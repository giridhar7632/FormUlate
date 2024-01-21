import { auth } from '@/lib/auth'
import { getXataClient } from '@/lib/xata'
import UserForm from './UserForm'

const xata = getXataClient()

export default async function Page() {
  const session = await auth()
  const user = await xata.db.nextauth_users.read(session?.user?.id as string)

  return (
    <div className="w-92 sm:w-96 flex flex-col border items-center bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-2xl p-6 md:p-12">
      {user ? (
        <UserForm
          id={user.id}
          image={user.image}
          email={user.email}
          name={user.name}
        />
      ) : (
        <p className="dark:text-gray-300">User not found!</p>
      )}
    </div>
  )
}
