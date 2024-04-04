import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Divider,
  Heading,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  return (
    <Container
      maxW={'4xl'}
      textAlign={'center'}
      alignItems={'center'}
      display={'flex'}
      gap={6}
      flexDirection={'column'}
      justifyContent={'center'}
      h={'100vh'}
    >
      <Card
        rounded={'lg'}
        padding={6}
        display={'flex'}
        flexDirection={'column'}
        gap={6}
        shadow={'xl'}
      >
        <Heading>Cadastre seus desenvolvedores!</Heading>
        <Divider />
        <ButtonGroup>
          <Button
            as={NextLink}
            w={'50%'}
            variant={'outline'}
            href="/desenvolvedores"
          >
            Desenvolvedores
          </Button>

          <Button as={NextLink} w={'50%'} variant={'outline'} href="/niveis">
            Níveis
          </Button>
        </ButtonGroup>

        <footer>By João Monteiro © 2024</footer>
      </Card>
    </Container>
  );
}
