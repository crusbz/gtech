'use client';

import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LevelItem } from '@/app/niveis/page';
import InputField from '../inputs/input-field';

const itemSchema = z.object({
  nome: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
});

type InputDeveloper = z.infer<typeof itemSchema>;

export default function FormLevel({
  editData,
  isEdit,
  closeModal,
}: {
  editData: LevelItem;
  isEdit: boolean;
  closeModal: () => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputDeveloper>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      nome: editData.nome || '',
    },
  });

  const toast = useToast();

  async function handleSave(values: any) {
    await fetch('http://localhost:3333/niveis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    toast({
      title: 'Sucesso',
      description: 'Nível criado com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  async function handleUpdate(values: any) {
    await fetch('http://localhost:3333/niveis/' + editData.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    toast({
      title: 'Sucesso',
      description: 'Nível atualizado com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  async function onSubmit(values: any) {
    console.log(values);
    event?.preventDefault();
    if (isEdit) {
      handleUpdate(values);
    } else {
      handleSave(values);
    }
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id={'nome'}
        label={'Nome'}
        type="text"
        error={errors?.nome}
        errorMessage={errors?.nome?.message}
        registerProps={register('nome')}
      />

      <ButtonGroup display="flex" justifyContent="flex-end" mb={4}>
        <Button
          mt={4}
          colorScheme="red"
          isLoading={isSubmitting}
          onClick={closeModal}
        >
          Cancelar
        </Button>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          {isEdit ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </ButtonGroup>
    </form>
  );
}
