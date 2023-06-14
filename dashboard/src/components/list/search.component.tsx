import {usePathname, useRouter} from "next/navigation";
import React, {useState, useTransition} from "react";
import { Flex, TextInput } from '@tremor/react';
import ProjectCreateComponent from "~/components/list/project-create.component";

export default function Search({disabled}: {disabled?: boolean}) {
  const [isPending, startTransition] = useTransition();
  let [isOpen, setIsOpen] = useState(false);

  const {replace} = useRouter();
  const pathname = usePathname();
  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Flex className="flex-row mt-8">
      <div className="flex-1">
        <div className="rounded-md shadow-sm">
          <div
            className="pointer-events-none absolute flex items-center pl-2 pt-2.5"
            aria-hidden="true"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </div>
          <TextInput
            disabled={disabled}
            className="transition ease-in-out h-10 w-full duration-300 border border-gray-300 focus:border-gray-700 ring-gray-700 ring-inset"
            placeholder="Search by name..."
            spellCheck={false}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {isPending && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>
      <ProjectCreateComponent />
    </Flex>
  );
}
