interface ButtonPalette {
  key: string;
  name: string;
  colorScheme: {
    rosewater: string;
    flamingo: string;
    pink: string;
    mauve: string;
    red: string;
    maroon: string;
    peach: string;
    yellow: string;
    green: string;
    teal: string;
    blue: string;
    sky: string;
    sapphire: string;
    lavender: string;
  };
}

export const ButtonPalettes: ButtonPalette[] = [
  {
    key: 'ghost',
    name: 'Ghost',
    colorScheme: {
      rosewater: 'bg-transparent hover:bg-cat-rosewater-opacity-20 text-cat-text hover:text-cat-base',
      flamingo: 'bg-transparent hover:bg-cat-flamingo-opacity-20 text-cat-text hover:text-cat-base',
      pink: 'bg-transparent hover:bg-cat-pink-opacity-20 text-cat-text hover:text-cat-base',
      mauve: 'bg-transparent hover:bg-cat-mauve-opacity-20 text-cat-text hover:text-cat-base',
      red: 'bg-transparent hover:bg-cat-red-opacity-20 text-cat-text hover:text-cat-base',
      maroon: 'bg-transparent hover:bg-cat-maroon-opacity-20 text-cat-text hover:text-cat-base',
      peach: 'bg-transparent hover:bg-cat-peach-opacity-20 text-cat-text hover:text-cat-base',
      yellow: 'bg-transparent hover:bg-cat-yellow-opacity-20 text-cat-text hover:text-cat-base',
      green: 'bg-transparent hover:bg-cat-green-opacity-20 text-cat-text hover:text-cat-base',
      teal: 'bg-transparent hover:bg-cat-teal-opacity-20 text-cat-text hover:text-cat-base',
      blue: 'bg-transparent hover:bg-cat-blue-opacity-20 text-cat-text hover:text-cat-base',
      sky: 'bg-transparent hover:bg-cat-sky-opacity-20 text-cat-text hover:text-cat-base',
      sapphire: 'bg-transparent hover:bg-cat-sapphire-opacity-20 text-cat-text hover:text-cat-base',
      lavender: 'bg-transparent hover:bg-cat-lavender-opacity-20 text-cat-text hover:text-cat-base'
    }
  },
  {
    key: 'solid',
    name: 'Solid',
    colorScheme: {
      rosewater: 'bg-cat-rosewater-opacity-50 hover:bg-cat-rosewater-opacity-100 text-cat-base hover:text-cat-base',
      flamingo: 'bg-cat-flamingo-opacity-50 hover:bg-cat-flamingo-opacity-100 text-cat-base hover:text-cat-base',
      pink: 'bg-cat-pink-opacity-50 hover:bg-cat-pink-opacity-100 text-cat-base hover:text-cat-base',
      mauve: 'bg-cat-mauve-opacity-50 hover:bg-cat-mauve-opacity-100 text-cat-base hover:text-cat-base',
      red: 'bg-cat-red-opacity-50 hover:bg-cat-red-opacity-100 text-cat-base hover:text-cat-base',
      maroon: 'bg-cat-maroon-opacity-50 hover:bg-cat-maroon-opacity-100 text-cat-base hover:text-cat-base',
      peach: 'bg-cat-peach-opacity-50 hover:bg-cat-peach-opacity-100 text-cat-base hover:text-cat-base',
      yellow: 'bg-cat-yellow-opacity-50 hover:bg-cat-yellow-opacity-100 text-cat-base hover:text-cat-base',
      green: 'bg-cat-green-opacity-50 hover:bg-cat-green-opacity-100 text-cat-base hover:text-cat-base',
      teal: 'bg-cat-teal-opacity-50 hover:bg-cat-teal-opacity-100 text-cat-base hover:text-cat-base',
      blue: 'bg-cat-blue-opacity-50 hover:bg-cat-blue-opacity-100 text-cat-base hover:text-cat-base',
      sky: 'bg-cat-sky-opacity-50 hover:bg-cat-sky-opacity-100 text-cat-base hover:text-cat-base',
      sapphire: 'bg-cat-sapphire-opacity-50 hover:bg-cat-sapphire-opacity-100 text-cat-base hover:text-cat-base',
      lavender: 'bg-cat-lavender-opacity-50 hover:bg-cat-lavender-opacity-100 text-cat-base hover:text-cat-base'
    }
  },
  {
    key: 'outline',
    name: 'Outline',
    colorScheme: {
      rosewater: 'bg-transparent border-1 border-cat-rosewater hover:bg-cat-rosewater text-cat-rosewater hover:text-cat-base',
      flamingo: 'bg-transparent border-1 border-cat-flamingo hover:bg-cat-flamingo text-cat-flamingo hover:text-cat-base',
      pink: 'bg-transparent border-1 border-cat-pink hover:bg-cat-pink text-cat-pink hover:text-cat-base',
      mauve: 'bg-transparent border-1 border-cat-mauve hover:bg-cat-mauve text-cat-mauve hover:text-cat-base',
      red: 'bg-transparent border-1 border-cat-red hover:bg-cat-red text-cat-red hover:text-cat-base',
      maroon: 'bg-transparent border-1 border-cat-maroon hover:bg-cat-maroon text-cat-maroon hover:text-cat-base',
      peach: 'bg-transparent border-1 border-cat-peach hover:bg-cat-peach text-cat-peach hover:text-cat-base',
      yellow: 'bg-transparent border-1 border-cat-yellow hover:bg-cat-yellow text-cat-yellow hover:text-cat-base',
      green: 'bg-transparent border-1 border-cat-green hover:bg-cat-green text-cat-green hover:text-cat-base',
      teal: 'bg-transparent border-1 border-cat-teal hover:bg-cat-teal text-cat-teal hover:text-cat-base',
      blue: 'bg-transparent border-1 border-cat-blue hover:bg-cat-blue text-cat-blue hover:text-cat-base',
      sky: 'bg-transparent border-1 border-cat-sky hover:bg-cat-sky text-cat-sky hover:text-cat-base',
      sapphire: 'bg-transparent border-1 border-cat-sapphire hover:bg-cat-sapphire text-cat-sapphire hover:text-cat-base',
      lavender: 'bg-transparent border-1 border-cat-lavender hover:bg-cat-lavender text-cat-lavender hover:text-cat-base'
    }
  }
];
