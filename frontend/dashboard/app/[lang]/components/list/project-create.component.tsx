'use client';
import React, { useState, useEffect, useRef } from 'react';

interface OSData {
  platform: string[];
}

interface OSOptions {
  [key: string]: OSData;
}

const OS: OSOptions = {
  android: {
    platform: ['Java / Kotlin', 'React Native', 'Xamarin', 'Unity'],
  },
  windows: {
    platform: ['UWP', 'WPF', 'WinForms', 'Unity'],
  },
};

const ProjectCreateComponent = () => {
  const [selectedOS, setSelectedOS] = useState<string>('android');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(OS[selectedOS]?.platform || ['Java / Kotlin']);
  const [selectedType, setSelectedType] = useState<string>('alpha');

  //Autoselect Android & Kotlin/Java
  useEffect(() => {
    const androidRadio = document.getElementById('radio-android') as HTMLInputElement;
    const javaKotlinRadio = document.getElementById('radio-java/kotlin') as HTMLInputElement;
    if (androidRadio && javaKotlinRadio) {
      androidRadio.checked = true;
      javaKotlinRadio.checked = true;
    }
  }, []);

  const resetReleaseTypes = () => {
    setSelectedType('alpha');
  };

  const handleOSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOS = event.target.value.toLowerCase();
    const platforms = OS[selectedOS]?.platform || [];
    setSelectedOS(selectedOS);
    setSelectedPlatforms(platforms);
  };

  const renderPlatforms = () => {
    return selectedPlatforms.map((platform) => (
      <div className='flex flex-row gap-2' key={`radio-${platform.toLowerCase()}`}>
        <input
          type='radio'
          name='platform_input'
          id={`radio-${platform.toLowerCase().replace(/\s/g, '')}`}
          className='radio'
          value={platform}
          tabIndex={0}
          required
        />
        <label htmlFor={`radio-${platform.toLowerCase()}`}>{platform}</label>
      </div>
    ));
  };

  const renderTypeOptions = () => {
    const types: string[] = ['Alpha', 'Beta', 'Production', 'Custom'];

    const handleReleaseTypeChange = (event: React.MouseEvent<HTMLLIElement>) => {
      const value = event.currentTarget.id;
      setSelectedType(value || '');
    };

    return types.map((type) => (
      <li
        key={`type_${type.toLowerCase()}`}
        id={`${type.toLowerCase()}`}
        tabIndex={0}
        className='cursor-pointer select-none p-2 transition hover:bg-gray-200 rounded-lg'
        onClick={handleReleaseTypeChange}>
        {type.toLowerCase() === 'custom' ? `${type}...` : `${type}`}
      </li>
    ));
  };

  const renderOS = () => {
    const OSes: string[] = ['Android', 'Windows'];
    return OSes.map((os) => (
      <div className='flex flex-row gap-2' key={`radio-${os.toLowerCase()}`}>
        <input
          type='radio'
          name='os_input'
          id={`radio-${os.toLowerCase().replace(/\s/g, '')}`}
          value={os}
          className='radio'
          required
          onChange={handleOSChange}
          tabIndex={0}
        />
        <label htmlFor={`radio-${os.toLowerCase()}`}>{os}</label>
      </div>
    ));
  };
  //Declaration for rendering
  const renderOSes = renderOS();
  const renderPlatform = renderPlatforms();
  const renderTypes = renderTypeOptions();

  return (
    <dialog id='project_create' className='modal w-full'>
      <form method='dialog' id='project_create_form' className='modal-box w-full'>
        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
        <h3 className='font-bold text-lg'>New project</h3>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row mt-3 flex-grow gap-4'>
            <div className='flex flex-col gap-1 flex-grow'>
              <p className='text-sm'>
                Project name:<span className='text-red-600'> *</span>
              </p>
              <input
                tabIndex={0}
                id='project_name'
                type='text'
                placeholder='Enter a project name'
                className='input input-bordered flex w-full'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-sm'>Icon:</p>
              <div className='w-12 h-12 bg-gray-200 rounded-full flex cursor-pointer'>
                <input type='file' className='hidden' id='file_input'></input>
                <label htmlFor='file_input' className='w-full h-full flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path d='M19 9l-6.258-5.908L12.24 1.462A1.55 1.55 0 0010.882 1H9.118a1.55 1.55 0 00-1.358.462L7.258 3.092 1 9m18 0-6.258-5.908L12.24 1.462A1.55 1.55 0 0010.882 1H9.118a1.55 1.55 0 00-1.358.462L7.258 3.092 1 9m18 0v8a2 2 0 01-2 2H3a2 2 0 01-2-2V9m0 0h18' />
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <div className='flex flex-row mt-3 flex-grow gap-4'>
            <div className='flex flex-col gap-1 flex-grow'>
              <p className='text-sm'>
                Release type:<span className='text-red-600'> *</span>
              </p>
              {selectedType != 'custom' && (
                <div id='release_type' className='dropdown w-full'>
                  <div tabIndex={0} className='input input-bordered w-full flex cursor-pointer'>
                    <p id='relaase_type_selected' className='my-auto'>
                      {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                    </p>
                    <svg
                      className='w-5 h-5 ml-auto my-auto'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path d='M6 9l6 6 6-6' />
                    </svg>
                  </div>
                  <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full'>
                    {renderTypes}
                  </ul>
                </div>
              )}
              {selectedType === 'custom' && (
                <div id='release_type_custom' className='flex flex-col gap-1'>
                  <input
                    placeholder='Type your release type'
                    type='text'
                    id='release_type_input'
                    className='input input-bordered flex w-full'
                    required></input>
                  <a>
                    <p className='text-sm underline cursor-pointer' onClick={resetReleaseTypes}>
                      Return to pre-set release types
                    </p>
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-row gap-32 mt-3'>
            <p className='text-sm'>
              OS:<span className='text-red-600'> *</span>
            </p>
            <div className='flex flex-col gap-1'>{renderOSes}</div>
          </div>
          <div className='flex flex-row gap-24 mt-3'>
            <p className='text-sm'>
              Platform:<span className='text-red-600'> *</span>
            </p>
            <div className='flex flex-col gap-1'>{renderPlatform}</div>
          </div>
        </div>
        <div className='modal-action'>
          <button id='project_add_button' className='btn btn-primary w-full mt-4'>
            Add
          </button>
        </div>
      </form>
      <form method='dialog' className='modal-backdrop'>
        <button></button>
      </form>
    </dialog>
  );
};

export default ProjectCreateComponent;
