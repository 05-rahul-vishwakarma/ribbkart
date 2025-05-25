import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

export function useTheme() {
  const colorScheme = useColorScheme();
  
  // For now, we're always using light theme regardless of system preference
  // This can be extended later to support dark mode
  return {
    colors: Colors,
    isDark: false,
  };
}