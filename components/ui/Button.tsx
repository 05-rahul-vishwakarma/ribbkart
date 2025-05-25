import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'filled',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={isLoading || rest.disabled}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'filled' ? Colors.text.light : Colors.primary.dark} 
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filledButton: {
    backgroundColor: Colors.primary.dark,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary.dark,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  filledText: {
    color: Colors.text.light,
  },
  outlinedText: {
    color: Colors.primary.dark,
  },
  textText: {
    color: Colors.primary.dark,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});