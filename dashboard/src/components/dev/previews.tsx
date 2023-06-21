import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox-next';
import { PaletteTree } from './palette';
import { Navbar } from '~/components/navbar/navbar';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/Nav">
        <Navbar />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
