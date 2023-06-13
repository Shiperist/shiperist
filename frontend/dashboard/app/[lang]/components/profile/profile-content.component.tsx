import React, { useEffect, useState } from 'react';

export default function ProfileContent() {
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
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
    const hasInputChanged = Object.values(inputValues).some((value) => value.trim() !== '');
    setIsInputChanged(hasInputChanged);
  }, [inputValues]);

  const renderGeneralTab = () => {
    return (
      <div id='general' className='flex flex-col border p-8 rounded-lg'>
        <h1 className='text-2xl font-bold'>General</h1>
        <div className='divider'></div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row pr-24'>
            <p className='w-full text-sm'>Username:</p>
            <input
              type='text'
              name='input1'
              id='username-input'
              className='input input-bordered input-sm w-full px-8'
              value={inputValues.input1}
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-row pr-24'>
            <p className='w-full text-sm'>E-mail:</p>
            <input
              type='text'
              name='input2'
              id='email-input'
              className='input input-bordered input-sm w-full px-8'
              value={inputValues.input2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button id='general-save' className='btn btn-primary mt-8 btn-sm w-fit' disabled={!isInputChanged}>
          Save changes
        </button>
      </div>
    );
  };

  const renderSecurityTab = () => {
    return (
      <div id='security' className='flex flex-col border p-8 rounded-lg'>
        <h1 className='text-2xl font-bold'>Security</h1>
        <div className='divider'></div>
        <div className='flex flex-col gap-4'></div>
      </div>
    );
  };

  const renderGeneral = renderGeneralTab();
  const renderSecurity = renderSecurityTab();
  return (
    <div className='w-[1200px] flex ml-32 flex-col'>
      <div className=' mt-8 text-neutral flex flex-col gap-4'>
        {renderGeneral}
        {renderSecurity}
      </div>
    </div>
  );
}
