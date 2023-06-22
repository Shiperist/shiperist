import { Flex, Text } from '@tremor/react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { DateTime } from 'luxon';
import React from 'react';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64';
import Button from '~/components/Button/Button';
import TextInput from '~/components/TextInput/TextInput';

interface IAppCreateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  optional: boolean;
  placeholder: string;
}

const AppCreateInput: React.FC<IAppCreateInputProps> = ({
  name,
  optional,
  placeholder,
  children,
  ...other
}) => {
  return (
    <Flex
      justifyContent="start"
      alignItems="start"
      flexDirection="row"
      className="gap-8"
    >
      <div className="basis-2/5">
        <Text className="font-bold text-ctp-text">
          {name}
          {optional ? (
            <span className="text-ctp-subtext0 font-normal">(Optional)</span>
          ) : (
            ''
          )}
        </Text>
        <Text className="text-ctp-subtext0">{children}</Text>
      </div>
      <TextInput
        required
        className="flex w-full h-12 text-ctp-text"
        name="name"
        placeholder={placeholder}
        tabIndex={0}
        {...other}
      />
    </Flex>
  );
};

export default AppCreateInput;
