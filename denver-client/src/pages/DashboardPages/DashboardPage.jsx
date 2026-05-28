import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, status: 'Active' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, status: 'Active' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, status: 'Pending' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, status: 'Active' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, status: 'Review' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, status: 'Review' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, status: 'Active' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, status: 'Pending' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, status: 'Active' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    minWidth: 130,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
    minWidth: 130,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={params.value === 'Active' ? 'success' : 'warning'}
        variant="outlined"
      />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    flex: 1,
    minWidth: 170,
    valueGetter: (value, row) =>
      `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const averageAge =
  rows.reduce((sum, row) => sum + (row.age || 0), 0) /
  rows.filter((row) => row.age !== null).length;

const summaryCards = [
  {
    label: 'Total Users',
    value: rows.length,
    note: 'Registered records',
    icon: <PeopleAltIcon />,
    color: '#0284c7',
    progress: 72,
  },
  {
    label: 'Articles',
    value: '8',
    note: 'Published content',
    icon: <ArticleIcon />,
    color: '#7c3aed',
    progress: 58,
  },
  {
    label: 'Page Views',
    value: '12.4k',
    note: 'This quarter',
    icon: <VisibilityIcon />,
    color: '#16a34a',
    progress: 84,
  },
  {
    label: 'Growth',
    value: '+18%',
    note: 'Compared with last month',
    icon: <TrendingUpIcon />,
    color: '#ea580c',
    progress: 66,
  },
];

const cardSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
};

function DashboardPage() {
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
              Overview
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
              Dashboard Summary
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>
              A clean snapshot of users, content activity, performance, and
              location data for the admin dashboard.
            </Typography>
          </Box>
          <Chip label="Live overview" color="primary" sx={{ alignSelf: 'flex-start' }} />
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
          },
          gap: 2,
        }}
      >
        {summaryCards.map(({ label, value, note, icon, color, progress }) => (
          <Card key={label} sx={cardSx}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
                    {value}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: color }}>
                  {icon}
                </Avatar>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {note}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mt: 2, height: 7, borderRadius: 99 }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 0.8fr' },
          gap: 2,
        }}
      >
        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Quarterly Performance
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comparison of visits and signups by quarter.
            </Typography>
            <Box sx={{ mt: 2, width: '100%', overflowX: 'auto' }}>
              <BarChart
                series={[
                  { data: [35, 44, 24, 34], label: 'Visits' },
                  { data: [21, 36, 29, 43], label: 'Signups' },
                ]}
                height={300}
                xAxis={[
                  {
                    data: ['Q1', 'Q2', 'Q3', 'Q4'],
                    scaleType: 'band',
                    label: 'Quarters',
                  },
                ]}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Audience Mix
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User distribution and average age target.
            </Typography>
            <Stack alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Gauge
                width={170}
                height={130}
                value={Number(averageAge.toFixed(1))}
                valueMin={10}
                valueMax={80}
              />
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 55, label: 'Active' },
                      { id: 1, value: 25, label: 'Pending' },
                      { id: 2, value: 20, label: 'Review' },
                    ],
                  },
                ]}
                width={260}
                height={190}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', xl: '1.2fr 0.8fr' },
          gap: 2,
        }}
      >
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
                  Users Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Editable user records with quick status scanning.
                </Typography>
              </Box>
              <Chip label={`${rows.length} records`} variant="outlined" />
            </Stack>
            <Box sx={{ height: 420, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Location Map
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              National University-Manila, Sampaloc.
            </Typography>
            <Box
              sx={{
                height: 420,
                width: '100%',
                overflow: 'hidden',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <MapContainer
                center={[14.604253, 120.994314]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[14.604253, 120.994314]}>
                  <Popup>
                    National University-Manila <br />
                    551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default DashboardPage;
