
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import searchicon from '../../assets/Search.svg';
// import './searchinput.css';

// function SearchInput() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <div className="input-container">
//       <input
//         type="text"
//         placeholder="Enter your keywords..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <Link to={searchQuery ? `/search/${searchQuery}` : '/'} className="search-icon-link">
//         <img src={searchicon} alt="" className='search-icon' />
//       </Link>
//     </div>
//   );
// }

// export default SearchInput;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchicon from '../../assets/Search.svg';
import './searchinput.css';

function SearchInput({ initialValue }) {
  const [searchQuery, setSearchQuery] = useState(initialValue || '');

  // Update searchQuery when initialValue changes
  useEffect(() => {
    setSearchQuery(initialValue || '');
  }, [initialValue]);

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter your keywords..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link to={searchQuery ? `/search/${searchQuery}` : '/'} className="search-icon-link">
        <img src={searchicon} alt="" className='search-icon' />
      </Link>
    </div>
  );
}

export default SearchInput;
