import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddUserButtonProps {
  onClick: () => void;
}

export const AddUserButton = ({ onClick }: AddUserButtonProps) => (
  <Button
    variant="contained"
    color="primary"
    startIcon={<AddIcon />}
    onClick={onClick}
  >
    Add User
  </Button>
);
