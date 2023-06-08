import type {NextAuthOptions} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
    debug: process.env.NODE_ENV === "development",
    providers: [
        KeycloakProvider({
            clientId: process.env.AUTH_CLIENT_ID || "",
            clientSecret: process.env.AUTH_CLIENT_SECRET || "",
            issuer: process.env.AUTH_ISSUER,
        }),
    ],
};
