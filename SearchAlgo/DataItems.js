import React from 'react';
import '../ShortUrl/frontend/src/App.css';

function DataItems(each) {
  return (
    <li className="short-url-form">
    {each}
    </li>
  );
}

export default DataItems;
