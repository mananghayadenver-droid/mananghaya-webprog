import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { getArticles, saveArticles } from '../../utils/articleStore';

const blankForm = {
  id: '',
  name: '',
  title: '',
  image: '',
  content: '',
  isPublished: true,
};

const toSlug = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [articles, setArticles] = useState(getArticles());
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmation, setConfirmation] = useState('');

  const resetForm = () => {
    setForm(blankForm);
    setErrors({});
  };

  const syncArticles = (nextArticles) => {
    setArticles(nextArticles);
    saveArticles(nextArticles);
  };

  const openModal = (article) => {
    setModal({ open: true, id: article?.id ?? null });
    setErrors({});
    setForm(
      article
        ? {
            ...article,
            content: article.content.join('\n\n'),
          }
        : {
            ...blankForm,
          }
    );
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const title = String(form.title || '').trim();
    const name = toSlug(form.name || title);
    const content = String(form.content || '')
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (!title) {
      nextErrors.title = 'Title is required.';
    }

    if (!name) {
      nextErrors.name = 'Slug is required.';
    }

    const image = String(form.image || '').trim();

    if (!image) {
      nextErrors.image = 'Image URL is required.';
    } else if (!/^(https?:\/\/|\/)/i.test(image)) {
      nextErrors.image = 'Use a full image URL or a path that starts with /.';
    }

    if (!content.length) {
      nextErrors.content = 'Add at least one paragraph.';
    }

    if (
      name &&
      articles.some((article) => article.id !== modal.id && article.name === name)
    ) {
      nextErrors.name = 'Slug already exists.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const normalizedTitle = String(form.title).trim();
    const normalizedName = toSlug(form.name || normalizedTitle);
    const normalizedContent = String(form.content)
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    const nextArticle = {
      id: modal.id || normalizedName,
      name: normalizedName,
      title: normalizedTitle,
      image: String(form.image).trim(),
      content: normalizedContent,
      isPublished: form.isPublished,
    };

    const nextArticles = modal.id
      ? articles.map((article) =>
          article.id === modal.id ? nextArticle : article
        )
      : [...articles, nextArticle];

    syncArticles(nextArticles);
    setConfirmation(
      modal.id
        ? 'Article updated successfully.'
        : 'New article added successfully.'
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    const nextArticles = articles.map((article) =>
      article.id === id
        ? { ...article, isPublished: !article.isPublished }
        : article
    );
    const selected = nextArticles.find((article) => article.id === id);

    syncArticles(nextArticles);
    setConfirmation(
      `${selected?.title || 'Article'} is now ${
        selected?.isPublished ? 'published' : 'hidden'
      }.`
    );
  };

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          !query ||
          [article.title, article.name, article.content.join(' ')].some((field) =>
            String(field).toLowerCase().includes(query)
          );
        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'published'
            ? article.isPublished
            : !article.isPublished);

        return matchesSearch && matchesStatus;
      }),
    [articles, searchTerm, statusFilter]
  );

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 190 },
    { field: 'name', headerName: 'Slug', flex: 1, minWidth: 180 },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.2,
      minWidth: 220,
      sortable: false,
      valueGetter: (value, row) => row.content[0] || '',
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isPublished ? 'Published' : 'Hidden'}
          color={row.isPublished ? 'success' : 'default'}
          variant={row.isPublished ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isPublished ? 'warning' : 'success'}
            onClick={() => toggleStatus(row.id)}
          >
            {row.isPublished ? 'Hide' : 'Publish'}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Typography variant="h4">Articles</Typography>
          <Typography color="text.secondary">
            Manage the same article collection shown on the public ArticleListPage.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          Add Article
        </Button>
      </Box>

      {confirmation ? (
        <Alert
          severity="success"
          onClose={() => setConfirmation('')}
          sx={{ mb: 2 }}
        >
          {confirmation}
        </Alert>
      ) : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Search articles"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search title, slug, or content"
            fullWidth
          />
          <TextField
            label="Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            select
            sx={{ minWidth: { xs: '100%', md: 170 } }}
          >
            <MenuItem value="all">All articles</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="hidden">Hidden</MenuItem>
          </TextField>
        </Stack>

        {filteredArticles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No articles match the current search and filters.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  name="title"
                  label="Title"
                  value={form.title}
                  onChange={handleChange}
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                  fullWidth
                />
                <TextField
                  name="name"
                  label="Slug"
                  value={form.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name || 'Example: pixel-platformer'}
                  fullWidth
                />
              </Stack>
              <TextField
                name="image"
                label="Image URL"
                value={form.image}
                onChange={handleChange}
                error={Boolean(errors.image)}
                helperText={
                  errors.image ||
                  'Paste an image link, for example: https://example.com/image.jpg'
                }
                fullWidth
              />
              <TextField
                name="content"
                label="Content"
                value={form.content}
                onChange={handleChange}
                error={Boolean(errors.content)}
                helperText={errors.content || 'Separate paragraphs with a blank line.'}
                multiline
                rows={8}
                fullWidth
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isPublished"
                    checked={form.isPublished}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isPublished
                    ? 'Article status: Published'
                    : 'Article status: Hidden'
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? 'Update Article' : 'Save Article'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
