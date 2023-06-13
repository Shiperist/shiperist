declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTH_CLIENT_ID: string;
            AUTH_CLIENT_SECRET: string;
            AUTH_ISSUER: string;
        }
    }
}
