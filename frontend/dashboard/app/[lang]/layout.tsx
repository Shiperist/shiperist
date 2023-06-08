import '@/styles/globals.css'
import React from "react";
import {NextAuthProvider} from "@/lib/providers";
import {i18n} from "@/i18n-config";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({lang: locale}))
}

export default function RootLayout({children, params,}: {
    children: React.ReactNode
    params: { lang: string }
}) {
    return (
        <html lang={params.lang}>
        <body>
        <NextAuthProvider>{children}</NextAuthProvider>
        </body>
        </html>
    )
}
