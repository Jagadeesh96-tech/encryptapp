import { AES } from "crypto-js";
import { useState } from "react";
//import Utf8 from 'crypto-js/enc-utf8';

function Encrypt() {

    const [encryptedstring, setencryptedstring] = useState('');
    const [painstring, setpainstring] = useState('');
    const [key, setkey] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      encrypting(painstring, key);
    };
  
     const encrypting = (painstring, key) => {
      const encrypted = AES.encrypt(painstring, key);
      const encryptdata =encrypted.toString();
      setencryptedstring(encryptdata);
      console.log(encryptdata);
      }
    return (
      <div className="Encrypt">
        
        <h1>String Encryption App</h1>
        <form onSubmit={handleSubmit}>
        <label>Plain Data:</label>
        <input
          type="text"
          value={painstring}
          onChange={(e) => setpainstring(e.target.value)}
        />
        <br />
        <label>Input Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setkey(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>Encrypted Text:{encryptedstring}</p>
      </div>
    );
  }
  
  export default Encrypt;
