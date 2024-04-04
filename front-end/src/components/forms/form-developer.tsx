'use client';

import { useForm } from 'react-hook-form';
import { Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { DeveloperItem } from '@/app/desenvolvedores/page';
import InputField from '../inputs/input-field';
import SelectField from '../inputs/select-field';

const itemSchema = z.object({
  nome: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  nivelId: z.coerce.number().min(1, { message: 'Selecione um nivel' }),
  hobby: z
    .string()
    .min(2, { message: 'O hobby deve ter pelo menos 2 caracteres' }),
  sexo: z.string().min(1, { message: 'Selecione um sexo' }),
  datadenascimento: z.string().min(1, { message: 'Selecione uma data' }),
});

type InputDeveloper = z.infer<typeof itemSchema>;

export default function FormDeveloper({
  editData,
  isEdit,
  closeModal,
}: {
  editData: DeveloperItem;
  isEdit: boolean;
  closeModal: () => void;
}) {
  const [levels, setLevels] = useState<{ id: number; nome: string }[]>([]);
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InputDeveloper>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      nome: editData.nome || '',
      nivelId: editData?.nivel?.id || 0,
      sexo: editData.sexo || '',
      datadenascimento: editData.datadenascimento || '',
      hobby: editData.hobby || '',
    },
  });

  async function getLevels() {
    const response = await fetch('http://localhost:3333/niveis');
    const data = await response.json();
    console.log(data);
    setLevels(data);
  }

  useEffect(() => {
    getLevels();
  }, []);

  async function handleSave(values: any) {
    await fetch('http://localhost:3333/desenvolvedores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    toast({
      title: 'Sucesso',
      description: 'Desenvolvedor criado com sucesso',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  async function handleUpdate(values: any) {
    await fetch('http://localhost:3333/desenvolvedores/' + editData.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    toast({
      title: 'Sucesso',
      description: 'Desenvolvedor atualizado com sucesso',
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

      <SelectField
        id={'nivelId'}
        label={'Nivel'}
        control={register('nivelId')}
        error={errors?.nivelId}
        errorMessage={errors?.nivelId?.message}
        registerProps={register('nivelId')}
        options={levels.map((level) => ({
          value: level.id,
          label: level.nome,
        }))}
      />

      <InputField
        id={'datadenascimento'}
        label={'Data de Nascimento'}
        type="date"
        error={errors?.datadenascimento}
        errorMessage={errors?.datadenascimento?.message}
        registerProps={register('datadenascimento')}
      />

      <SelectField
        id={'sexo'}
        label={'Sexo'}
        control={register('sexo')}
        error={errors?.sexo}
        errorMessage={errors?.sexo?.message}
        registerProps={register('sexo')}
        options={[
          { value: 'M', label: 'Masculino' },
          { value: 'F', label: 'Feminino' },
        ]}
      />

      <InputField
        id={'hobby'}
        label={'Hobby'}
        type="text"
        error={errors?.hobby}
        errorMessage={errors?.hobby?.message}
        registerProps={register('hobby')}
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
