import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const performanceSeries = [
  { data: [18, 26, 34, 28, 42, 51], label: 'Traffic' },
  { data: [12, 18, 24, 31, 36, 45], label: 'Conversions' },
];

const reportCards = [
  {
    title: 'Traffic Stability',
    icon: <InsightsIcon color="primary" />,
    body: 'Visits are trending upward with stronger retention in the most recent cycle.',
    progress: 78,
  },
  {
    title: 'Content Reach',
    icon: <ShowChartIcon color="success" />,
    body: 'Retro game articles are receiving stronger engagement from repeat visitors.',
    progress: 64,
  },
  {
    title: 'Audience Split',
    icon: <DonutLargeIcon color="warning" />,
    body: 'Active users still form the largest segment, with pending users rising gradually.',
    progress: 57,
  },
];

const cardSx = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
};

function ReportsPage() {
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
              Reports
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
              Charts and data visualization
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
              Visual reporting for traffic, conversions, and audience behavior
              using MUI cards and chart components.
            </Typography>
          </Box>
          <Chip label="Updated today" color="primary" sx={{ alignSelf: 'flex-start' }} />
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
        {reportCards.map(({ title, icon, body, progress }) => (
          <Card key={title} sx={cardSx}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {title}
                </Typography>
                {icon}
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {body}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mt: 3, height: 8, borderRadius: 99 }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', xl: '1.4fr 0.8fr' },
          gap: 2,
        }}
      >
        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Monthly Performance Trends
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comparison of traffic and conversions over six periods.
            </Typography>
            <Box sx={{ mt: 2, width: '100%', overflowX: 'auto' }}>
              <LineChart
                height={340}
                series={performanceSeries}
                xAxis={[
                  {
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    scaleType: 'point',
                  },
                ]}
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={cardSx}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Traffic Sources
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User acquisition by channel.
            </Typography>
            <Stack alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <PieChart
                width={300}
                height={240}
                series={[
                  {
                    data: [
                      { id: 0, value: 40, label: 'Organic' },
                      { id: 1, value: 25, label: 'Direct' },
                      { id: 2, value: 20, label: 'Social' },
                      { id: 3, value: 15, label: 'Referral' },
                    ],
                  },
                ]}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1.5}>
              {[
                ['Organic', 'Best-performing source this month'],
                ['Direct', 'Strong repeat visitor behavior'],
                ['Social', 'Growing campaign traction'],
              ].map(([label, note]) => (
                <Box key={label}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {note}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ReportsPage;
