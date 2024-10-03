import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";
//import { userQueryOptions } from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, LockKeyhole } from 'lucide-react';

const Login = () => {
  return (
    <div className="container mx-auto  px-4 py-16 flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Log in to access your Expense Tracker Pro account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <LockKeyhole className="w-16 h-16 text-muted-foreground" />
        </CardContent>
        <CardFooter className="flex gap-2 justify-between">
          <Button asChild className="w-2/5" size="lg">
            <a href="/api/auth/login" className="flex items-center justify-center">
              <LogIn className="mr-2 h-5 w-5" /> Login to Your Account
            </a>
          </Button>
          <Button asChild className="w-2/5" size="lg">
            <a href="/api/auth/register" className="flex items-center justify-center">
              <LogIn className="mr-2 h-5 w-5" /> Register an Account
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
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