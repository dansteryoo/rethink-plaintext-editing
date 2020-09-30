import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ longUrl });
    axios
      .post("http://localhost:5000/short/", { longUrl: longUrl })
      .then((res) => {
        return setShortUrl(res.data.shortUrl);
      })
      .catch((err) => {
        setErrors([err.response.data]);
      });
  };

  return (
    <div className="short-url-form">
      <form className="form">
        <ul className="errors">
          {errors.map((err, i) => (
            <li key={`error-${i}`}>{err}</li>
          ))}
        </ul>
        <label>
          <input
            type="text"
            className="input"
            value={longUrl}
            placeholder={"https://"}
            onChange={(e) => setLongUrl(e.target.value)}
            // required
          />
        </label>
        <button className="button" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
      <div className="short-url">
        <p>
          <strong>New URL: </strong>
          <a href={shortUrl}>{shortUrl}</a>
        </p>
      </div>
    </div>
  );
}

export default App;
