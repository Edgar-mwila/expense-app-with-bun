import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";
//import { userQueryOptions } from "@/lib/api";

const Login = () => {
  return (
    <div>
      <p>You have to log in.</p>
      <a href="/api/auth/login">Login</a>
    </div>
  )
}

const Component = () => {
    const user = Route.useRouteContext().user;
    if (!user) {
      return <Login />
    }

    return <Outlet />
  }
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {
    const queryClient = context.queryClient

    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data;
    } catch (e) {
      console.error(e);
      return {user: null};
    }
  },
  component: Component,
})