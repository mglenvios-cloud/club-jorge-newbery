declare module 'react-native' {
  import React from 'react';
  export const View: any;
  export const Text: any;
  export const StyleSheet: any;
  export const ScrollView: any;
  export const TouchableOpacity: any;
  export const Image: any;
}

declare module '@react-navigation/native' {
  export const NavigationContainer: any;
}

declare module 'react' {
  export = React;
  export as namespace React;
  namespace React {
    type ReactNode = any;
    function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
    function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  }
}
