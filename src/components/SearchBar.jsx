// SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearch, categories, areas, selectedCategory, selectedArea, onCategoryChange, onAreaChange, onReset }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipe..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
        ))}
      </select>

      <select value={selectedArea} onChange={(e) => onAreaChange(e.target.value)}>
        <option value="">All Areas</option>
        {areas.map((area) => (
          <option key={area.strArea} value={area.strArea}>{area.strArea}</option>
        ))}
      </select>

      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default SearchBar;
