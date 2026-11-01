import { useCallback, useEffect, useMemo, useState } from 'react';
import { initialPortfolioData, optimizedPortfolioAssets } from '../data/portfolioData';
import { readApiJson } from '../lib/api';
import { fetchPublicPortfolio, isSupabaseConfigured } from '../lib/supabase';
import { PortfolioContext } from './portfolioContext';

function updateLegacyImageUrls(value) {
  if (typeof value === 'string') {
    let fileName;
    try {
      fileName = decodeURIComponent(new URL(value, window.location.origin).pathname.split('/').pop() || '');
    } catch {
      return value;
    }

    const optimizedAsset = optimizedPortfolioAssets.find(({ legacyPrefix }) => fileName.startsWith(legacyPrefix));
    return optimizedAsset?.image || value;
  }

  if (Array.isArray(value)) return value.map(updateLegacyImageUrls);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, updateLegacyImageUrls(item)]));
  }
  return value;
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(initialPortfolioData);
  const [storageError, setStorageError] = useState('');
  const [contentLoading, setContentLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;
    const loadContent = async () => {
      try {
        const content = await fetchPublicPortfolio();
        if (active && content && typeof content === 'object' && !Array.isArray(content)) {
          setData(updateLegacyImageUrls({ ...initialPortfolioData, ...content }));
        }
      } catch (error) {
        if (active) {
          console.error('Unable to load portfolio content from Supabase:', error);
          setStorageError(`Could not load saved portfolio content: ${error.message}`);
        }
      } finally {
        if (active) setContentLoading(false);
      }
    };

    void loadContent();
    return () => { active = false; };
  }, []);

  const saveContent = useCallback(async (nextData) => {
    const response = await fetch('/api/portfolio', {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextData),
    });

    const result = await readApiJson(response);
    if (!response.ok) {
      const error = new Error(result.error || 'Unable to save portfolio content.');
      setStorageError(error.message);
      throw error;
    }

    setData(nextData);
    setStorageError('');
  }, []);

  const updateSection = useCallback((section, sectionValue) => {
    return saveContent({ ...data, [section]: sectionValue });
  }, [data, saveContent]);

  const resetPortfolio = useCallback(() => saveContent(initialPortfolioData), [saveContent]);

  const value = useMemo(() => ({
    data,
    storageError,
    contentLoading,
    updateSection,
    resetPortfolio,
  }), [data, storageError, contentLoading, updateSection, resetPortfolio]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
