import OpenAPIClientAxios from "openapi-client-axios";
import { Client as UserClient } from "@/lib/client";
import { getSession } from "next-auth/react";

const api = new OpenAPIClientAxios({
  definition: "http://localhost:8080/q/openapi",
  axiosConfigDefaults: {
    withCredentials: true,
    baseURL: "http://localhost:8080/",
    headers: {
      Authorization:
        "Bearer " + getSession().then((session) => console.log(session)),
    },
  },
});

api.withServer({ url: "http://localhost:8080/", description: "Local API" });

export default async function user() {
  const client = await api.getClient<UserClient>();
  return client.user();
}
