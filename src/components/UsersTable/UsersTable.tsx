'use client';

import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Typography,
  Box,
  Container,
  TableSortLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUsers,
  simulateDeleteUsers,
  selectUser,
  selectAllUsers,
  deselectAllUsers,
  setSortOrder,
  setSortBy
} from '@/store/userSlice';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal/DeleteConfirmationModal';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import styles from './UsersTable.module.scss'

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    users,
    selectedUsers,
    isLoading,
    error,
    sortOrder,
    sortBy
  } = useAppSelector((state) => state.users);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRequestSort = (property: 'id' | 'name' | 'zipcode') => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    dispatch(setSortOrder(isAsc ? 'desc' : 'asc'));
    dispatch(setSortBy(property));
  };

  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      const isAsc = sortOrder === 'asc';

      switch (sortBy) {
        case 'id':
          return isAsc ? a.id - b.id : b.id - a.id;
        case 'name':
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'zipcode':
          return isAsc
            ? a.address.zipcode.localeCompare(b.address.zipcode)
            : b.address.zipcode.localeCompare(a.address.zipcode);
        default:
          return 0;
      }
    });
  }, [users, sortOrder, sortBy]);

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      dispatch(deselectAllUsers());
    } else {
      dispatch(selectAllUsers());
    }
  };

  const handleDeleteConfirm = () => {
    dispatch(simulateDeleteUsers(selectedUsers));
    setIsDeleteModalOpen(false);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', mt: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>

          {selectedUsers.length > 0 && (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete {selectedUsers.length} Users
            </Button>
          )}
        </Box>

        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'id'}
                    direction={sortBy === 'id' ? sortOrder : 'asc'}
                    onClick={() => handleRequestSort('id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'zipcode'}
                    direction={sortBy === 'zipcode' ? sortOrder : 'asc'}
                    onClick={() => handleRequestSort('zipcode')}
                  >
                    Zipcode
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  selected={selectedUsers.includes(user.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => dispatch(selectUser(user.id))}
                    />
                  </TableCell>
                  <TableCell data-th="ID">{user.id}</TableCell>
                  <TableCell>
                    <UserAvatar name={user.name} size={40} />
                  </TableCell>
                  <TableCell data-th="Name">{user.name}</TableCell>
                  <TableCell data-th="Username">{user.username}</TableCell>
                  <TableCell data-th="E-mail">{user.email}</TableCell>
                  <TableCell data-th="Phone">{user.phone}</TableCell>
                  <TableCell data-th="Zipcode">{user.address.zipcode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <DeleteConfirmationModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          selectedCount={selectedUsers.length}
        />
      </Box>
    </Container>
  );
};

export default UsersTable;