import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Select } from '@chakra-ui/select';
import { FieldError } from 'react-hook-form';

export default function SelectField({
  id,
  label,
  control,
  error,
  errorMessage,
  registerProps,
  options,
}: {
  id: string;
  label: string;
  control: any;
  error: FieldError | undefined;
  errorMessage: string | undefined;
  registerProps: any;
  options: {
    value: string | number;
    label: string;
  }[];
}) {
  return (
    <FormControl id={id} isInvalid={!!error} mb={2}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        id={id}
        placeholder="Selecione a opção"
        {...registerProps}
        {...control}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error && errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
