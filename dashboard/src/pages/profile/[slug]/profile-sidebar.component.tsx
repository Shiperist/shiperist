import React from 'react';

export default function ProfileSidebar() {
  const renderTab = () => {
    const tabs = ['My details', 'Security'];
    const icons = [
      `<svg class="w-5 h-5 fill-gray-600" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>`,
      `<svg class="w-5 h-5 fill-gray-600" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"/></svg>`
    ];

    return tabs.map((tab, index) => {
      const icon = icons[index];
      const trustedIcon: { __html: string | TrustedHTML } | undefined = icon
        ? { __html: icon as string | TrustedHTML }
        : undefined;

      return (
        <button
          className="text-left hover:bg-gray-200 w-full pl-2 pr-3 h-10 rounded-lg flex my-auto transition"
          key={tab}
        >
          <a
            className="flex flex-row gap-6 my-auto text-gray-600 font-bold"
            href={`#${tab.replace(/\s/g, '').toLowerCase()}`}
          >
            <span
              className="icon my-auto"
              dangerouslySetInnerHTML={trustedIcon}
            ></span>
            {tab}
          </a>
        </button>
      );
    });
  };

  //Declaration for rendering
  const renderTabs = renderTab();

  return (
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
        {renderTabs}
      </div>
    </div>
  );
}
