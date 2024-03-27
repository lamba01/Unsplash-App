import React from 'react';
import SearchInput from '../../components/search/SearchInput';
import { useParams } from 'react-router-dom';

function SearchPage() {
  // Get search query from route parameters
  const { query } = useParams();

  return (
    <div>
      <h1>Search Page</h1>
      <SearchInput initialValue={query} />
      {/* Add search results component here */}
    </div>
  );
}

export default SearchPage;
