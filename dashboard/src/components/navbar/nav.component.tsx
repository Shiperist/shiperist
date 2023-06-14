import {useSession} from "next-auth/react";
import React from "react";
import Navbar from "~/components/navbar/navbar.component";

export default function Nav() {
  const session = useSession();
  return <Navbar user={session?.data?.user} />;
}
