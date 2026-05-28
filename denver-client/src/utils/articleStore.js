import seededArticles from '../data/article-content';

const ARTICLE_STORAGE_KEY = 'denver-client-articles';

const sanitizeArticles = (articles) =>
  articles.map((article, index) => ({
    id: article.id || article.name || `article-${index + 1}`,
    name: String(article.name || '').trim(),
    title: String(article.title || '').trim(),
    image: String(article.image || '').trim(),
    content: Array.isArray(article.content)
      ? article.content.map((paragraph) => String(paragraph).trim()).filter(Boolean)
      : [],
    isPublished:
      typeof article.isPublished === 'boolean' ? article.isPublished : true,
  }));

export const getSeedArticles = () =>
  sanitizeArticles(
    seededArticles.map((article, index) => ({
      id: article.name || `article-${index + 1}`,
      ...article,
      isPublished: true,
    }))
  );

export const getArticles = () => {
  if (typeof window === 'undefined') {
    return getSeedArticles();
  }

  try {
    const stored = window.localStorage.getItem(ARTICLE_STORAGE_KEY);

    if (!stored) {
      return getSeedArticles();
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? sanitizeArticles(parsed) : getSeedArticles();
  } catch {
    return getSeedArticles();
  }
};

export const saveArticles = (articles) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    ARTICLE_STORAGE_KEY,
    JSON.stringify(sanitizeArticles(articles))
  );
};
