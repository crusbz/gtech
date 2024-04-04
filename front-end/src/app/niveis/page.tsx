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
import FormLevel from '@/components/forms/form-level';

const itemSchema = z.object({
  id: z.coerce.number(),
  nome: z.string(),
});

export type LevelItem = z.infer<typeof itemSchema>;
export default function ListLevels() {
  const [levels, setLevels] = useState<LevelItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const [levelDataEdit, setLevelEdit] = useState<LevelItem>({
    id: 0,
    nome: '',
  });

  async function getLevels() {
    const response = await fetch('http://localhost:3333/niveis');
    const data = await response.json();
    console.log(data);
    setLevels(data);
  }

  async function handleRemove(id: number) {
    await fetch(`http://localhost:3333/niveis/${id}`, {
      method: 'DELETE',
    });
  }

  async function handleEdit(data: any) {
    setIsEdit(true);
    setLevelEdit(data);
    onOpen();
  }

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <Container maxW={'4xl'} padding={4} h={'100vh'}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={() => {
          setIsEdit(false);
          getLevels();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'Editar' : 'Adicionar'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLevel
              editData={levelDataEdit}
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
        rounded={'lg'}
        sx={customStyles.scrollBar}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {levels?.map((level) => (
              <Tr key={level.id}>
                <Td>{level.id}</Td>
                <Td>
                  <Badge colorScheme={'yellow'}>{level.nome}</Badge>
                </Td>
                <Td>
                  <KebabMenu
                    handleEdit={() => handleEdit(level)}
                    handleRemove={() => handleRemove(level.id)}
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
