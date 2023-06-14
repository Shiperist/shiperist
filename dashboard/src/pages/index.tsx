import {type NextPage} from "next";
import {signIn, signOut, useSession} from "next-auth/react";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import React from "react";
import {Card, List, Text, Title} from "@tremor/react";
import Search from "~/components/list/search.component";
import ProjectEntryComponent from "~/components/list/project-entry.component";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({text: "from tRPC"});

  type Project = {
    id: string;
    name: string;
    description: string;
    image: string;
    url: string;
  };

  type Projects = {
    [key: string]: Project;
  };

  const projects: Projects = {
    "project-1": {
      id: "435345934759839230597235",
      name: "Project 1",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
      url: "https://google.com",
    },
    "project-2": {
      id: "435345934759839230597235",
      name: "Project 2",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
      url: "https://google.com",
    },
    "project-3": {
      id: "435345934759839230597235",
      name: "Project 3",
      description: "This is a project",
      image: "https://picsum.photos/200/300",
      url: "https://google.com",
    },
  };

  return (
    <main className="px-8 mt-24 mx-auto max-w-7xl">
      <Title>Projects</Title>
      <Text>
        A list of your projects. <a href="#">Learn more</a>
      </Text>
      <Search />
      <Card className="mt-4 card card-compact overflow-auto p-0 cursor-pointer drop-shadow-none">
        <List>
          {Object.keys(projects).map((project) => {
            return (
              <ProjectEntryComponent project={projects[project]} key={project} />
            );
          })}
        </List>
      </Card>
    </main>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const {data: sessionData} = useSession();
  const router = useRouter();


  const {data: secretMessage} = api.example.getSecretMessage.useQuery(
    undefined, // no input
    {enabled: sessionData?.user !== undefined},
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
