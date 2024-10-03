import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '../../lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, Mail } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (error) return 'Not Logged in';

  if (isPending) return <ProfileSkeleton />;

  const { user } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.picture!} alt={user.family_name} />
            <AvatarFallback>{user.family_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.given_name} {user.family_name}</CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>{user.email}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" variant="destructive">
            <a href="/api/auth/logout" className="flex items-center justify-center">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-full max-w-[250px]" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;