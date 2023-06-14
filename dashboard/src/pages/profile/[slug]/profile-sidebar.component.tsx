import React from "react";

export default function ProfileSidebar() {
  const renderTab = () => {
    const tabs = ["General", "Security"];

    return tabs.map((tab) => (
      <li key={`tab-${tab.toLowerCase()}`} id={tab.toLowerCase()}>
        <a href={`#${tab.toLowerCase()}`}>{tab}</a>
      </li>
    ));
  };

  //Declaration for rendering
  const renderTabs = renderTab();

  return (
    <div className="flex flex-col px-4 gap-2 relative">
      <div className="w-[256px] h-[256px] bg-gray-200 rounded-full flex cursor-pointer">
        <input className="hidden" id="file_input" type="file" />
        <label className="w-full h-full flex items-center justify-center" htmlFor="file_input">
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
      <div className="divider !m-0 !mt-2" />
      <ul className="flex menu w-full bg-base-100 text-neutral">{renderTabs}</ul>
    </div>
  );
}
