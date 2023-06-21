import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useUserProfile() {
  const session = useSession();
  const router = useRouter();

  const user = session?.data?.user;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        // Handle successful sign-out if needed
      })
      .catch((error) => {
        console.log(error); // Handle sign-out error if needed
      });
  };

  const handleSignIn = (app: string) => {
    signIn(app)
      .then(() => {
        // Handle successful sign-out if needed
      })
      .catch((error) => {
        console.log(error); // Handle sign-out error if needed
      });
  };

  const navigateToProfile = () => {
    if (!user) {
      return;
    }

    void router.push(`/profile/${user?.id}`);
  };

  return { user, handleSignOut, handleSignIn, navigateToProfile };
}
