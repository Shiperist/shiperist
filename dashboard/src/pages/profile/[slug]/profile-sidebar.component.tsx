import React from 'react';

export default function ProfileSidebar() {
  const renderTab = () => {
    const tabs = ['My details', 'Security'];
    const icons = [
        `<span class="material-symbols-outlined">person</span>`,
        `<span class="material-symbols-outlined">security</span>`
    ];

    return tabs.map((tab, index) => {
      const icon = icons[index];
      const trustedIcon: { __html: string | TrustedHTML } | undefined = icon
        ? { __html: icon as string | TrustedHTML }
        : undefined;

      return (
        <button
          className="text-left hover:bg-gray-200 w-full pl-4 pr-3 h-10 rounded-lg flex my-auto transition"
          key={tab}
        >
          <a
            className="flex flex-row gap-4 my-auto text-gray-600 font-bold"
            href={`#${tab.replace(/\s/g, '').toLowerCase()}`}
          >
            <span
              className="icon my-auto w-6 h-6"
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
