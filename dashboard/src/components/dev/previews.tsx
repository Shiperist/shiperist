import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox-next';
import { PaletteTree } from './palette';
import Nav from '~/components/navbar/nav.component';

const ComponentPreviews = () => {
  return <Previews palette={<PaletteTree />}>
    <ComponentPreview path='/Nav'>
      <Nav />
    </ComponentPreview>
  </Previews>;
};

export default ComponentPreviews;
