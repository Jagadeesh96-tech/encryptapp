import { AES } from "crypto-js";
import { useState } from "react";
import Utf8 from 'crypto-js/enc-utf8';

function Decrypt() {
  const [encryptedString, setEncryptedString] = useState('');
  const [decryptedString, setDecryptedString] = useState('');
  const [key, setKey] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    decrypting(encryptedString, key);
  };

  const decrypting = (encryptedString, key) => {
    if (!encryptedString || !key) {
      setErrors({
        encryptedString: encryptedString ? '' : 'Encrypted string is required',
        key: key ? '' : 'Key is required'
      });
      return;
    }

    try {
      const decrypted = AES.decrypt(encryptedString, key);
      const plainData = decrypted.toString(Utf8);
      setDecryptedString(plainData);
      console.log(plainData);
    } catch (error) {
      setErrors({ encryptedString: 'Invalid encrypted string or key' });
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(encryptedString);
    alert('Encrypted text copied to clipboard!');
  };

  return (
    <div className="Decrypt">
      <h1>String Decryption App</h1>
      <form onSubmit={handleSubmit}>
        <label>Encrypted Data:</label>
        <input type="text" value={encryptedString} onChange={(e) => setEncryptedString(e.target.value)} />
        {errors.encryptedString && <div style={{ color: 'red' }}>{errors.encryptedString}</div>}
        <br />

        <label>Input Key:</label>
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
        {errors.key && <div style={{ color: 'red' }}>{errors.key}</div>}
        <br />

        <button type="submit">Submit</button>
      </form>
      <p style={{display: 'flex', alignItems: 'center'}}>Decrypted Text: {decryptedString}
      {decryptedString && (
        <span onClick={handleCopy} style={{
          cursor: 'pointer',
          borderRadius: '50%',
          padding: '5px',
          border: '4px solid  #eee',
          marginLeft: '10px'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.85714 21C8.83147 21 8 20.1685 8 19.1429V9.85714C8 8.83147 8.83147 8 9.85714 8H19.1429C20.1685 8 21 8.83147 21 9.85714V19.1429C21 20.1685 20.1685 21 19.1429 21H9.85714Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 16H4.85714C3.83147 16 3 15.1685 3 14.1429V4.85714C3 3.83147 3.83147 3 4.85714 3H14.1429C15.1685 3 16 3.83147 16 4.85714V8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        
      )}
      </p>
    </div>
  );
}

export default Decrypt;
