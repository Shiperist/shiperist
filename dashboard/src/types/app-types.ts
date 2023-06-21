import React from 'react';

interface OSData {
  platform: string[];
  icon: string;
  color?: string;
}

interface OSType {
  [key: string]: OSData;
}

export const Types: OSType = {
  android: {
    platform: ['Java / Kotlin', 'React Native', 'Xamarin', 'Unity'],
    icon: '<img width="24" height="24" src="https://img.icons8.com/ios/24/android-os.png" alt="android-os"/>',
    color: '#3DDC84'
  },
  windows: {
    platform: ['UWP', 'WPF', 'WinForms', 'Unity'],
    icon: '<img width="24" height="24" src="https://img.icons8.com/metro/24/windows8.png" alt="windows8"/>',
    color: '#0078D7'
  }
};

export interface GitProvider {
  key: string;
  name: string;
  icon: React.ReactNode;
}
