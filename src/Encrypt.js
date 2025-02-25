
import { AES } from "crypto-js";
import { useState } from "react";

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
      <p style={{display: 'flex', alignItems: 'center'}}>Encrypted Text: {encryptedString}{encryptedString&&(<span onClick={handleCopy} style={{
          cursor: 'pointer',
          borderRadius: '50%',
          padding: '5px',
          border: '1px solid #ccc',
          marginLeft: '10px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.85714 21C8.83147 21 8 20.1685 8 19.1429V9.85714C8 8.83147 8.83147 8 9.85714 8H19.1429C20.1685 8 21 8.83147 21 9.85714V19.1429C21 20.1685 20.1685 21 19.1429 21H9.85714Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 16H4.85714C3.83147 16 3 15.1685 3 14.1429V4.85714C3 3.83147 3.83147 3 4.85714 3H14.1429C15.1685 3 16 3.83147 16 4.85714V8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>)}
        
      </p>
    </div>
  );
}

export default Encrypt;
