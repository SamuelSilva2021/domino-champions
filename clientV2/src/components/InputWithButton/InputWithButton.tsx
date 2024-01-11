import { TextInput, TextInputProps, useMantineTheme, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface InputWithButtonProps extends TextInputProps {
  onSearchChange: (term: string) => void;
  placeholder: string;
}

export function InputWithButton( { onSearchChange, placeholder, ...props}: InputWithButtonProps) {
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder={placeholder}
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      onChange={(event) => onSearchChange(event.currentTarget.value)}
      {...props}
    />
  );
}