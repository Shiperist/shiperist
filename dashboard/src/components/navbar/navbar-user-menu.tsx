import Image from 'next/image';
import React from 'react';
import { useUserProfile } from '~/components/navbar/hooks/useUserProfile';
import { Flex, Text, Title } from '@tremor/react';
import Button from '~/components/Button/Button';

export function NavbarUserMenu() {
  const { user, handleSignOut, handleSignIn, navigateToProfile } =
    useUserProfile();

  return (
    <>
      <div className="border-t border-ctp-overlay1 pt-4 pb-3">
        {user ? (
          <>
            <Flex
              justifyContent="start"
              alignItems="center"
              flexDirection="row"
              className="px-4"
            >
              <Image
                className="h-8 w-8 rounded-full"
                src={user?.image || ''}
                height={32}
                width={32}
                alt={user?.name ? `${user.name} avatar` : ''}
              />
              <div className="ml-3">
                <Title className="text-ctp-text">{user.name}</Title>
                <Text className="text-ctp-subtext0">{user.email}</Text>
              </div>
            </Flex>
            <div className="p-4">
              <Button
                onClick={navigateToProfile}
                variant="info"
                className="w-full"
              >
                Profile
              </Button>
              <Button
                onClick={handleSignOut}
                variant="danger"
                className="w-full mt-3"
              >
                Sign out
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-3 space-y-1">
            <Button
              onClick={() => handleSignIn('github')}
              variant="success"
              className="w-full"
            >
              Sign in
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
