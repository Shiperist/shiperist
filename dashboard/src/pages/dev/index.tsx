import { type NextPage } from 'next';
import React from 'react';
import { AppList } from '~/components/app/app-list';
import { Flex, Text } from '@tremor/react';
import { Variants } from '~/components/Button/ButtonBase';
import Button from '~/components/Button/Button';
import { Check, Search, Space } from 'lucide-react';
import { Sizes } from '~/components/Base/BaseTypes';
import TextInput from '~/components/TextInput/TextInput';

const Dev: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <Text className="text-5xl font-bold text-ctp-text">Dev Page</Text>
      <text className="text-3xl text-ctp-subtext1 mt-8">Buttons</text>
      <Flex
        justifyContent="center"
        alignItems="stretch"
        flexDirection="col"
        className="gap-4"
      >
        <Text className="text-2xl font-bold text-ctp-text mt-8">
          Button Variants
        </Text>
        <Flex
          justifyContent="start"
          alignItems="center"
          flexDirection="row"
          className="gap-4"
        >
          {Variants.map((variant) => {
            return (
              <Button variant={variant} size="medium">
                {variant}
              </Button>
            );
          })}
        </Flex>
        <Text className="text-2xl font-bold text-ctp-text mt-8">
          Size Variants
        </Text>
        <Flex
          justifyContent="start"
          alignItems="center"
          flexDirection="row"
          className="gap-4"
        >
          {Sizes.map((size) => {
            return (
              <Button variant="warning" size={size}>
                {size}
              </Button>
            );
          })}
        </Flex>
        <Text className="text-2xl font-bold text-ctp-text mt-8">
          Icon Buttons Variants
        </Text>
        <Flex
          justifyContent="start"
          alignItems="center"
          flexDirection="row"
          className="gap-4"
        >
          <Button variant="success" size="medium" icon={Check}>
            Success
          </Button>
          <Button
            variant="success"
            size="medium"
            icon={Check}
            iconPosition="right"
          >
            Success
          </Button>
          <Button variant="success" size="medium" icon={Check}></Button>
          <Button variant="success" size="medium" loading={true}>
            Success
          </Button>
          <Button
            variant="success"
            size="medium"
            iconPosition="right"
            loading={true}
          >
            Success
          </Button>
          <Button
            variant="success"
            size="medium"
            iconPosition="right"
            loading={true}
          ></Button>
        </Flex>
      </Flex>
      <text className="text-3xl text-ctp-subtext1 mt-8">Text Input</text>
      <Flex
        justifyContent="center"
        alignItems="stretch"
        flexDirection="col"
        className="gap-4"
      >
        <Text className="text-2xl font-bold text-ctp-text mt-8">
          Button Variants
        </Text>
        <Flex
          justifyContent="start"
          alignItems="center"
          flexDirection="row"
          className="gap-4"
        >
          <TextInput
            leadingElement="https://"
            trailingElement={Search}
            loading={false}
            disabled={false}
            caption="This is a caption"
            className="w-full"
            placeholder="Type something..."
          />
        </Flex>
        <Text className="text-2xl font-bold text-ctp-text mt-8">
          Size Variants
        </Text>
        <Flex
          justifyContent="start"
          alignItems="center"
          flexDirection="row"
          className="gap-4"
        >
          {Sizes.map((size) => {
            return (
              <Button variant="warning" size={size}>
                {size}
              </Button>
            );
          })}
        </Flex>
        <Text className="text-2xl font-bold text-ctp-text mt-8">
          Icon Buttons Variants
        </Text>
        <Flex
          justifyContent="start"
          alignItems="center"
          flexDirection="row"
          className="gap-4"
        >
          <Button variant="success" size="medium" icon={Check}>
            Success
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Dev;
