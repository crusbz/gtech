import { IconButton } from '@chakra-ui/button';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu';
import {
  EditIcon,
  EllipsisVertical,
  ExternalLinkIcon,
  RepeatIcon,
  Trash,
} from 'lucide-react';
export default function KebabMenu({ handleRemove, handleEdit }: any) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<EllipsisVertical />}
        variant="outline"
      />
      <MenuList>
        <MenuItem onClick={handleEdit} icon={<EditIcon />}>
          Editar
        </MenuItem>
        <MenuItem onClick={handleRemove} color={'red'} icon={<Trash />}>
          Remover
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
