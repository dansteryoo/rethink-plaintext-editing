import React, { useState, useEffect } from 'react';
import '../ShortUrl/frontend/src/App.css';
import { DataItems } from './DataItems';

// limitations: for a million rows I would impliment a Boyer-Moore string search algorithm 
// ex: https://gist.github.com/jhermsmeier/2138865
// ex: https://gist.github.com/Kamilczak020/f8382eef9777e8f07d47be29a4efc04b

// but I'm not too familiar with it so I went with what I did know 
// this search splits the inputs into a regex and then matches the dataset
// it's something I've used in my projects

function SearchAlgo(initialData) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState({})

  useEffect(() => {
      setData(initialData)
  }, [])

  const searchRegexMatch = search => {
    const input = Array.from(search).reduce(
      (a, v, i) => `${a}[^${search.substring(i)}]*?${v}`,
      ''
    );
    return new RegExp(input);
  };

  const handleSearch = e => {
    const search = e.target.value;
    setSearch({ search });

    const searchData = searchRegexMatch(search.toLowerCase());

    const filteredData = data.filter(each => {
      return each.toLowerCase().match(searchData);
    });

    setData(filteredData)
  };

  return (
    <div className="short-url-form">
      <form className="form">
        <label>
          <input
            type="text"
            className="input"
            value={search}
            onChange={handleSearch}
            // required
          />
        </label>
      </form>
      <div>
      {data.map(each => {
          <DataItems each={each}/>
      })}
      </div>
    </div>
  );
}

export default SearchAlgo;
