import { type NextPage } from 'next';
import React from 'react';
import { Flex } from '@tremor/react';
import Button from '~/components/Button/Button';
import { Variants } from '~/components/Base/BaseButtonVariants';
import { Check } from 'lucide-react';
import { Sizes } from '~/components/Base/BaseTypes';
import TextInput from '~/components/TextInput/TextInput';
import Title from '~/components/Text/Title';
import Bold from '~/components/Text/Bold';
import Subtitle from '~/components/Text/Subtitle';
import Italic from '~/components/Text/Italic';
import Text from '~/components/Text/Text';
import Description from '~/components/Text/Description';
import InfoTooltip from '~/components/Other/InfoTooltip';
import Link from '~/components/Text/Link';

const Dev: NextPage = () => {
  const cardClass = 'gap-4 border border-ctp-text p-6 rounded-lg';
  return (
    <div className="max-w-7xl mx-auto p-8">
      <Flex
        justifyContent="center"
        alignItems="stretch"
        flexDirection="col"
        className="gap-8"
      >
        <Title>Dev Components Showcase</Title>
        {/* Buttons */}
        <Flex
          justifyContent="center"
          alignItems="stretch"
          flexDirection="col"
          className={cardClass}
        >
          <Subtitle className="">Buttons</Subtitle>
          <Bold className="">Button Variants</Bold>
          <Flex
            justifyContent="start"
            alignItems="center"
            flexDirection="row"
            className="gap-4"
          >
            {Variants.map((variant) => {
              return (
                <Button key={`key-${variant}`} variant={variant} size="medium">
                  {variant}
                </Button>
              );
            })}
          </Flex>
          <Bold className="">Size Variants</Bold>
          <Flex
            justifyContent="start"
            alignItems="center"
            flexDirection="row"
            className="gap-4"
          >
            {Sizes.map((size) => {
              return (
                <Button key={`key-${size}`} variant="warning" size={size}>
                  {size}
                </Button>
              );
            })}
          </Flex>
          <Bold className="">Icon Button Variants</Bold>
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
        {/* Text Inputs */}
        <Flex
          justifyContent="center"
          alignItems="stretch"
          flexDirection="col"
          className={cardClass}
        >
          <Subtitle className="">Text Input</Subtitle>
          <Bold className="">Text Input Variants</Bold>
          <Flex
            justifyContent="start"
            alignItems="center"
            flexDirection="col"
            className="gap-4"
          >
            <TextInput
              loading={false}
              disabled={false}
              error={false}
              caption="This is a caption"
              className="w-full"
              placeholder="Type something..."
            />
            <TextInput
              leadingElement="https://"
              trailingElement={Check}
              loading={false}
              disabled={false}
              error={false}
              caption="This is a caption"
              className="w-full"
              placeholder="Type something..."
            />
            <TextInput
              leadingElement="https://"
              trailingElement={Check}
              loading={true}
              disabled={false}
              error={false}
              caption="This is a caption"
              className="w-full"
              placeholder="Type something..."
            />
            <TextInput
              leadingElement="https://"
              trailingElement={Check}
              loading={false}
              disabled={true}
              error={false}
              caption="This is a caption"
              className="w-full"
              placeholder="Type something..."
            />
            <TextInput
              leadingElement="https://"
              trailingElement={Check}
              loading={false}
              disabled={false}
              error={true}
              caption="This is a caption"
              className="w-full"
              placeholder="Type something..."
            />
          </Flex>
        </Flex>
        {/* Texts */}
        <Flex
          justifyContent="center"
          alignItems="stretch"
          flexDirection="col"
          className={cardClass}
        >
          <Subtitle className="">Texts</Subtitle>
          <Bold className="">Texts Variants</Bold>
          <Flex
            justifyContent="start"
            alignItems="start"
            flexDirection="col"
            className="gap-4"
          >
            <Title>This is a title</Title>
            <Subtitle>This is a subtitle</Subtitle>
            <Text>This is a text</Text>
            <Bold>This is a bold text</Bold>
            <Italic>This is a italic text</Italic>
            <Link>This is a link</Link>
            <Description>This is a description</Description>
          </Flex>
        </Flex>
        {/* Other */}
        <Flex
          justifyContent="center"
          alignItems="stretch"
          flexDirection="col"
          className={cardClass}
        >
          <Subtitle className="">Other</Subtitle>
          <Flex
            justifyContent="start"
            alignItems="start"
            flexDirection="col"
            className="gap-4"
          >
            <Flex
              justifyContent="start"
              alignItems="start"
              flexDirection="row"
              className="gap-1"
            >
              <Text>Random text</Text>
              <InfoTooltip
                className="top-[-50px]"
                tooltip="Hello this is a information tooltip"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Dev;
