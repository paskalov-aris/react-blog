import React from 'react';

export const SortControls = ({ sortOrder, onSortChange }) => {
  const handleAscendingSortButtonClick = () => {
    onSortChange('asc');
  };

  const handleDescendingSortButtonClick = () => {
    onSortChange('desc');
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="d-flex gap-3 align-items-center">
        <span className="text-muted">Сортировка:</span>
        <button
          type="button"
          className={`btn btn-sm ${sortOrder === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={handleAscendingSortButtonClick}
          style={{ 
            textDecoration: 'none',
            fontWeight: sortOrder === 'asc' ? 'bold' : 'normal'
          }}
        >
          Дата ↑
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
          Дата ↓
        </button>
      </div>
    </div>
  );
}; 