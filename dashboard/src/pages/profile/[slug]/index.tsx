import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { NextPage } from 'next';
import {
  LinkIcon,
  LockClosedIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import ProfileSection from '~/components/profile/profile-section';
import ProfileSectionContent from '~/components/profile/profile-section-content';
import SecuritySectionContent from '~/components/profile/security-section-content';

type Section = {
  icon: React.ReactNode;
  name: string;
  href: string;
  current: boolean;
  content: React.ReactNode;
};

const Profile: NextPage = () => {
  const session = useSession();
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: ''
  });

  const [isInputChanged, setIsInputChanged] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    setIsInputChanged(true);
  };

  const resetInputs = () => {
    // Code to reset inputs
  };

  useEffect(() => {
    // Check if any input value is not empty
    const hasInputChanged = Object.values(inputValues).some(
      (value) => value.trim() != ''
    );
    setIsInputChanged(hasInputChanged);
  }, [inputValues]);

  if (session.status === 'authenticated') {
  }

  const sections: Section[] = [
    {
      name: 'Profile',
      href: '#profile',
      icon: (
        <UserIcon key="icon-details" className="w-6 h-6" aria-hidden="true" />
      ),
      current: true,
      content: <ProfileSectionContent />
    },
    {
      name: 'Connections',
      href: '#connections',
      icon: (
        <LinkIcon key="icon-links" className="w-6 h-6" aria-hidden="true" />
      ),
      current: false,
      content: 'This is the connections tab content.'
    },
    {
      name: 'Security',
      href: '#security',
      icon: (
        <LockClosedIcon
          key="icon-security"
          className="w-6 h-6"
          aria-hidden="true"
        />
      ),
      current: false,
      content: <SecuritySectionContent />
    },
    {
      name: 'Test1',
      href: '#test1',
      icon: (
        <LinkIcon key="icon-links" className="w-6 h-6" aria-hidden="true" />
      ),
      current: false,
      content: 'This is the connections tab content.'
    },
    {
      name: 'Test2',
      href: '#test2',
      icon: (
        <LinkIcon key="icon-links" className="w-6 h-6" aria-hidden="true" />
      ),
      current: false,
      content: 'This is the connections tab content.'
    },
    {
      name: 'Test3',
      href: '#test3',
      icon: (
        <LinkIcon key="icon-links" className="w-6 h-6" aria-hidden="true" />
      ),
      current: false,
      content: 'This is the connections tab content.'
    }
  ];

  const tabs = sections.map((section, index) => {
    const icon = section.icon;
    const trustedIcon = icon ? icon : null;

    return (
      <button
        className="text-left hover:bg-gray-200 w-full pl-4 pr-3 h-10 rounded-lg flex my-auto transition"
        key={section.name}
      >
        <a
          className="flex flex-row gap-4 my-auto text-gray-600 font-bold capitalize"
          href={`#${section.name.toLowerCase()}`}
        >
          <span className="icon my-auto w-6 h-6">{trustedIcon}</span>
          {section.name}
        </a>
      </button>
    );
  });

  const sectionsContent = sections.map((section, index) => {
    return (
      <ProfileSection title={section.name} id={section.name} key={section.name}>
        {section.content}
      </ProfileSection>
    );
  });

  return (
    <div className="midwrap max-w-full w-[1200px] mx-auto px-4">
      <div className="tbwrap my-8">
        <div className="flex flex-row w-full">
          <div className="flex flex-col px-4 gap-2 relative">
            <div className="w-[256px] h-[256px] bg-gray-200 rounded-full flex cursor-pointer">
              <input className="hidden" id="file_input" type="file" />
              <label
                className="w-full h-full flex items-center justify-center"
                htmlFor="file_input"
              >
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 9l-6.258-5.908L12.24 1.462A1.55 1.55 0 0010.882 1H9.118a1.55 1.55 0 00-1.358.462L7.258 3.092 1 9m18 0-6.258-5.908L12.24 1.462A1.55 1.55 0 0010.882 1H9.118a1.55 1.55 0 00-1.358.462L7.258 3.092 1 9m18 0v8a2 2 0 01-2 2H3a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </label>
            </div>
            <div className="mt-8 flex gap-2 flex-col w-full text-black">
              {tabs}
            </div>
          </div>
          <div className="w-[1200px] flex ml-32 flex-col">
            <div className=" mt-8 text-neutral flex flex-col gap-4">
              {sectionsContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
