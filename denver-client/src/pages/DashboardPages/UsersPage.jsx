import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const userRows = [
  { id: 1, firstName: 'Denver', lastName: 'James', email: 'denver@example.com', role: 'Admin', status: 'Active' },
  { id: 2, firstName: 'Mia', lastName: 'Torres', email: 'mia@example.com', role: 'Editor', status: 'Active' },
  { id: 3, firstName: 'Luis', lastName: 'Garcia', email: 'luis@example.com', role: 'Analyst', status: 'Pending' },
  { id: 4, firstName: 'Kara', lastName: 'Lopez', email: 'kara@example.com', role: 'Reviewer', status: 'Active' },
  { id: 5, firstName: 'Noah', lastName: 'Reyes', email: 'noah@example.com', role: 'Support', status: 'Review' },
  { id: 6, firstName: 'Ella', lastName: 'Santos', email: 'ella@example.com', role: 'Manager', status: 'Active' },
];

const userColumns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 130 },
  { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 130 },
  { field: 'email', headerName: 'Email', flex: 1.4, minWidth: 220 },
  { field: 'role', headerName: 'Role', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={
          params.value === 'Active'
            ? 'success'
            : params.value === 'Pending'
              ? 'warning'
              : 'default'
        }
        variant="outlined"
      />
    ),
  },
];

const cardSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
};

function UsersPage() {
  const activeUsers = userRows.filter((user) => user.status === 'Active').length;
  const pendingUsers = userRows.filter((user) => user.status === 'Pending').length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          p: { xs: 3, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography variant="overline" color="text.secondary">
              Users
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
              User list and details
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
              A clean MUI user management page with status summaries and a
              detailed user table.
            </Typography>
          </Box>
          <Chip label={`${userRows.length} total users`} color="primary" sx={{ alignSelf: 'flex-start' }} />
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 2,
        }}
      >
        <Card sx={cardSx}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
                  {userRows.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#2563eb' }}>
                <GroupIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
                  {activeUsers}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#16a34a' }}>
                <VerifiedUserIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Pending Users
                </Typography>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
                  {pendingUsers}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#f59e0b' }}>
                <PendingActionsIcon />
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Card sx={cardSx}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Users Table
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review core user information and status at a glance.
              </Typography>
            </Box>
            <Chip label="User details" variant="outlined" />
          </Stack>

          <Box sx={{ height: 460, width: '100%' }}>
            <DataGrid
              rows={userRows}
              columns={userColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
