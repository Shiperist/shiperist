import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { NextPage } from 'next';
import {
  ArrowUpTrayIcon,
  LinkIcon,
  LockClosedIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import ProfileSection from '~/components/profile/profile-section';
import ProfileSectionContent from '~/components/profile/profile-section-content';
import SecuritySectionContent from '~/components/profile/security-section-content';
import { scrollToPos, scrollToTop } from '~/utils/scroll';

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

  const [activeTab, setActiveTab] = useState('profile');
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

  //TODO: change button color when section is hovered

  /*   useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        console.log('id', id);
        // Rest of your code to handle the active state based on intersection
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []); */

  if (session.status === 'authenticated') {
  }

  const scrollToElement = (elementId: string) => {
    setActiveTab(elementId.toLowerCase());
    const element = document.getElementById(elementId);
    if (element) {
      const boundingRect = element.getBoundingClientRect().top;
      const elementPosition = boundingRect + window.scrollY;
      scrollToPos(elementPosition);
    }
    const targetElements = ['Profile', 'Connections', 'Security'];

    if (targetElements.includes(elementId)) {
      scrollToTop();
    }
  };

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
    },
    {
      name: 'Test4',
      href: '#test4',
      icon: (
        <LinkIcon key="icon-links" className="w-6 h-6" aria-hidden="true" />
      ),
      current: false,
      content: 'This is the connections tab content.'
    },
    {
      name: 'Test5',
      href: '#test5',
      icon: (
        <LinkIcon key="icon-links" className="w-6 h-6" aria-hidden="true" />
      ),
      current: false,
      content: 'This is the connections tab content.'
    },
    {
      name: 'Test6',
      href: '#test6',
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
        className={`${
          activeTab == section.name.toLowerCase()
            ? 'bg-ctp-mantle hover:bg-ctp-crust'
            : 'hover:bg-ctp-mantle'
        } text-left w-full pl-4 pr-3 h-10 rounded-lg flex my-auto transition`}
        key={section.name}
        onClick={() => scrollToElement(section.name)}
      >
        <a className="flex flex-row gap-4 w-full my-auto text-ctp-text font-bold capitalize">
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
      <div className="tbwrap py-8 flex flex-row">
        <div className="w-[256px] flex flex-col px-4 gap-2">
          <div className="sticky top-24">
            <div className="w-[256px] h-[256px] bg-ctp-overlay1 rounded-full flex cursor-pointer">
              <input className="hidden" id="file_input" type="file" />
              <label
                className="w-full h-full flex items-center justify-center"
                htmlFor="file_input"
              >
                <ArrowUpTrayIcon className="h-10 w-10 stroke-ctp-overlay2" />
              </label>
            </div>
          </div>
          <div className="mt-8 sticky top-[394px]">
            <div className="flex flex-col w-full text-black gap-2">{tabs}</div>
          </div>
        </div>
        <div className="w-[1200px] flex ml-32 flex-col overflow-y-auto">
          <div className="mt-8 text-neutral flex flex-col gap-4">
            {sectionsContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
