// app/providers.tsx
'use client';

import { ChakraProvider, theme } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
