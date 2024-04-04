'use client';

import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/modal';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/table';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import KebabMenu from '@/components/menus/kebab-menu';
import { Badge, Container, useMediaQuery } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import customStyles from '@/styles';
import FormDeveloper from '@/components/forms/form-developer';

const itemSchema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
  nivel: z.object({
    id: z.coerce.number(),
    nome: z.string(),
  }),
  sexo: z.string(),
  datadenascimento: z.string(),
  hobby: z.string(),
});

export type DeveloperItem = z.infer<typeof itemSchema>;
export default function ListDevelopers() {
  const [developers, setDevelopers] = useState<DeveloperItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const [developerDataEdit, setDeveloperEdit] = useState<DeveloperItem>({
    id: 0,
    nome: '',
    nivel: {
      id: 0,
      nome: '',
    },
    sexo: '',
    datadenascimento: '',
    hobby: '',
  });

  async function getDevelopers() {
    const response = await fetch('http://localhost:3333/desenvolvedores');
    const data = await response.json();
    console.log(data);
    setDevelopers(data);
  }

  function convertDateToBR(value: string) {
    const date = new Date(value);
    return date.toLocaleDateString('pt-BR');
  }

  function getBadgeSex(value: string): string {
    const mapBadge: Record<string, string> = {
      M: 'blue',
      F: 'red',
    };
    return mapBadge[value] || 'gray';
  }

  async function handleRemove(id: number) {
    await fetch(`http://localhost:3333/desenvolvedores/${id}`, {
      method: 'DELETE',
    });
  }

  async function handleEdit(data: any) {
    setIsEdit(true);
    setDeveloperEdit(data);
    onOpen();
  }

  useEffect(() => {
    getDevelopers();
  }, []);

  return (
    <Container maxW={'4xl'} padding={4} h={'100vh'}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={() => {
          setIsEdit(false);
          getDevelopers();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'Editar' : 'Adicionar'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormDeveloper
              editData={developerDataEdit}
              isEdit={isEdit}
              closeModal={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex
        w={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        marginBottom={4}
      >
        <Button as={NextLink} href={'/'}>
          <ArrowBackIcon />
        </Button>
        <Button onClick={onOpen} colorScheme="blue">
          Adicionar
        </Button>
      </Flex>
      <TableContainer
        maxH={'75%'}
        padding={4}
        border={'1px'}
        borderColor={'gray.200'}
        overflowY={'auto'}
        sx={customStyles.scrollBar}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Nivel</Th>
              <Th>Sexo</Th>
              <Th>Data de Nascimento</Th>
              <Th>Hobby</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {developers?.map((developer) => (
              <Tr key={developer.id}>
                <Td>{developer.id}</Td>
                <Td>{developer.nome}</Td>
                <Td>
                  <Badge colorScheme="yellow">{developer.nivel?.nome}</Badge>
                </Td>
                <Td>
                  <Badge colorScheme={getBadgeSex(developer.sexo)}>
                    {developer.sexo}
                  </Badge>
                </Td>
                <Td>{convertDateToBR(developer.datadenascimento)}</Td>
                <Td>{developer.hobby}</Td>
                <Td>
                  <KebabMenu
                    handleEdit={() => handleEdit(developer)}
                    handleRemove={() => handleRemove(developer.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
