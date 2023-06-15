import React, { useEffect, useState } from 'react';
import { Button, TextInput, Divider } from '@tremor/react';

export default function ProfileContent() {
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
      (value) => value.trim() !== ''
    );

    setIsInputChanged(hasInputChanged);
  }, [inputValues]);

  const renderGeneralTab = () => {
    return (
      <div
        className="flex flex-col border p-8 rounded-lg bg-gray-50 shadow-md"
        id="mydetails"
      >
        <h1 className="text-2xl font-bold">My details</h1>
        <Divider />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row pr-24">
            <p className="w-full text-sm">Username:</p>
            <TextInput
              className="input input-bordered input-sm w-full px-8"
              id="username-input"
              name="input1"
              type="text"
              value={inputValues.input1}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-row pr-24">
            <p className="w-full text-sm">E-mail:</p>
            <TextInput
              className="input input-bordered input-sm w-full px-8"
              id="email-input"
              name="input2"
              type="text"
              value={inputValues.input2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button
          className="rounded-md border border-transparent w-fit mt-6 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          disabled={!isInputChanged}
          id="general-save"
        >
          Save changes
        </Button>
      </div>
    );
  };

  const renderSecurityTab = () => {
    return (
      <div
        className="flex flex-col border p-8 rounded-lg bg-gray-50 shadow-md"
        id="security"
      >
        <h1 className="text-2xl font-bold">Security</h1>
        <div className="divider" />
        <div className="flex flex-col gap-4" />
      </div>
    );
  };

  const renderGeneral = renderGeneralTab();
  const renderSecurity = renderSecurityTab();

  return (
    <div className="w-[1200px] flex ml-32 flex-col">
      <div className=" mt-8 text-neutral flex flex-col gap-4">
        {renderGeneral}
        {renderSecurity}
      </div>
    </div>
  );
}
