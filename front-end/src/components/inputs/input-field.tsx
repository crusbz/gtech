import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

export default function InputField({
  id,
  label,
  type,
  error,
  errorMessage,
  registerProps,
}: {
  id: string;
  label: string;
  type: string;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerProps: any;
}) {
  return (
    <FormControl id={id} isInvalid={!!error} mb={2}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input placeholder={label} type={type} {...registerProps} />
      <FormErrorMessage>{error && errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
