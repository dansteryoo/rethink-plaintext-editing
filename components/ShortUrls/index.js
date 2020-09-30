import React, {useState} from 'react';
import axios from 'axios';

export const ShortUrls = () => {
    const [longUrl, setLongUrl] = useState("")
    const [shortUrl, setShortUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async () => {
        console.log({ longUrl });
        try {
            const res = await axios.post('/short', { longUrl });
            console.log({ res });
            return setShortUrl(res.data)
        } catch (err) {
            return setErrors([err.message])
        }
    }

  return (
    <div className="short-url-form">
      <form onSubmit={handleSubmit} className="form">
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
            placeholder={' '}
            onChange={e => setLongUrl(e.target.value)}
            // required
          />
        </label>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <div className="short-url">
        <span>{shortUrl}</span>
      </div>
    </div>
  );
}