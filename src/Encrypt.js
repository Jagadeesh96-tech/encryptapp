import { AES } from "crypto-js";
import { useState } from "react";
//import Utf8 from 'crypto-js/enc-utf8';

function Encrypt() {
  const [plainString, setPlainString] = useState('');
  const [encryptedString, setEncryptedString] = useState('');
  const [key, setKey] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    encrypting(plainString, key);
  };

  const encrypting = (plainString, key) => {
    if (!plainString || !key) {
      setErrors({
        plainString: plainString ? '' : 'Plain string is required',
        key: key ? '' : 'Key is required'
      });
      return;
    }

    try {
      const encrypted = AES.encrypt(plainString, key);
      const encryptData = encrypted.toString();
      setEncryptedString(encryptData);
      console.log(encryptData);
    } catch (error) {
      setErrors({ plainString: 'Invalid plain string or key' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encryptedString);
    alert('Encrypted text copied to clipboard!');
  };

  return (
    <div className="Encrypt">
      <h1>String Encryption App</h1>
      <form onSubmit={handleSubmit}>
        <label>Plain Data:</label>
        <input type="text" value={plainString} onChange={(e) => setPlainString(e.target.value)} />
        {errors.plainString && <div style={{ color: 'red' }}>{errors.plainString}</div>}
        <br />

        <label>Input Key:</label>
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
        {errors.key && <div style={{ color: 'red' }}>{errors.key}</div>}
        <br />

        <button type="submit">Submit</button>
      </form>
      <p>Encrypted Text:{encryptedstring}</p>
      </div>
    );
  }
  
  export default Encrypt;