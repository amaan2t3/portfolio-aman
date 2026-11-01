import { useCallback, useEffect, useMemo, useState } from 'react';
import { initialPortfolioData } from '../data/portfolioData';
import { readApiJson } from '../lib/api';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { PortfolioContext } from './portfolioContext';

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(initialPortfolioData);
  const [storageError, setStorageError] = useState('');
  const [contentLoading, setContentLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;
    const loadContent = async () => {
      const { data: row, error } = await supabase
        .from('portfolio_content')
        .select('content')
        .eq('id', 1)
        .maybeSingle();

      if (!active) return;
      if (error) {
        console.error('Unable to load portfolio content from Supabase:', error);
        setStorageError(`Could not load saved portfolio content: ${error.message}`);
      } else if (row?.content && typeof row.content === 'object' && !Array.isArray(row.content)) {
        setData({ ...initialPortfolioData, ...row.content });
      }
      setContentLoading(false);
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
