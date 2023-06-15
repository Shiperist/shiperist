import { useRouter } from 'next/router';

const RouterHandler = () => {
  const handleRouterPush = (link: string) => {
    const router = useRouter();
    router
      .push(link)
      .then(() => {
        // Handle successful navigation if needed
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRouterReplace = (link: string) => {
    const router = useRouter();
    router
      .replace(link)
      .then(() => {
        // Handle successful navigation if needed
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    handleRouterPush,
    handleRouterReplace
  };
};

export default RouterHandler;
