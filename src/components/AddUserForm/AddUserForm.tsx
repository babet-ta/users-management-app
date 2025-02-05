import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUser } from '@/store/userSlice';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { useFormik } from 'formik';
import InputMask from "@mona-health/react-input-mask"
import { User } from '@/types';
import { validate } from '@/utils/validation'

interface AddUserFormProps {
  open: boolean;
  onClose: () => void;
}

export const AddUserForm = ({ open, onClose }: AddUserFormProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);

  const getNextId = (users: User[]): number => {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      zipcode: '',
    },
    validate,
    onSubmit: (values) => {
      const newUser: User = {
        id: getNextId(users),
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        address: {
          zipcode: values.zipcode,
          street: '',
          suite: '',
          city: '',
          geo: { lat: '', lng: '' }
        },
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
      };

      dispatch(addUser(newUser));
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <InputMask
              mask="+7 999 999-99-99"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            >
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
              />
            </InputMask>
            <TextField
              fullWidth
              id="zipcode"
              type="number"
              name="zipcode"
              label="Zipcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
              helperText={formik.touched.zipcode && formik.errors.zipcode}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Add User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};