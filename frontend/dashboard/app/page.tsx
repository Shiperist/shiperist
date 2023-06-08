import React from "react";
import NavbarComponent from "@/components/navbar/navbar.component";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <header>
                <NavbarComponent/>
            </header>
            <main>

            </main>
            <h1>Server Session</h1>
            <pre>{JSON.stringify(session)}</pre>
        </div>
    )
}
