import React from 'react';
import { useTranslation } from 'react-i18next';

export const SortControls = ({ sortOrder, onSortChange }) => {
  const { t } = useTranslation();

  const handleAscendingSortButtonClick = () => {
    onSortChange('asc');
  };

  const handleDescendingSortButtonClick = () => {
    onSortChange('desc');
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="d-flex gap-3 align-items-center">
        <span className="text-muted">{t('sorting')}:</span>
        <button
          type="button"
          className={`btn btn-sm ${sortOrder === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={handleAscendingSortButtonClick}
          style={{ 
            textDecoration: 'none',
            fontWeight: sortOrder === 'asc' ? 'bold' : 'normal'
          }}
        >
          {t('date_asc')}
        </button>
        <button
          type="button"
          className={`btn btn-sm ${sortOrder === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={handleDescendingSortButtonClick}
          style={{ 
            textDecoration: 'none',
            fontWeight: sortOrder === 'desc' ? 'bold' : 'normal'
          }}
        >
          {t('date_desc')}
        </button>
      </div>
    </div>
  );
}; 