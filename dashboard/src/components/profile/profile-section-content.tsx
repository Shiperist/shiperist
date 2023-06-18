import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { NextPage } from 'next';
import {
  LinkIcon,
  LockClosedIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import ProfileSection from '~/components/profile/profile-section';
import { Text, TextInput } from '@tremor/react';
import { Button } from '~/components/base/button';

const ProfileSectionContent = () => {
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

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row pr-24">
          <Text className="w-full text-sm">Username:</Text>
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
          <Text className="w-full text-sm">E-mail:</Text>
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
        className="w-fit mt-6"
        disabled={!isInputChanged}
        id="general-save"
      >
        Save changes
      </Button>
    </>
  );
};

export default ProfileSectionContent;
