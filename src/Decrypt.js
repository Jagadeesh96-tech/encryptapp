import { AES } from "crypto-js";
import { useState } from "react";
import Utf8 from 'crypto-js/enc-utf8';

function Decrypt() {

    const [encryptedstring, setencryptedstring] = useState('');
    const [decryptedstring, setdecryptedstring] = useState('');
    const [key, setkey] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      decrypting(encryptedstring, key);
    };
  
     const decrypting = (encryptedstring, key) => {
      const decrypted = AES.decrypt(encryptedstring, key);
      const plaindata =decrypted.toString(Utf8);
      setdecryptedstring(plaindata);
      console.log(plaindata);
      }
    return (
      <div className="Decrypt">
        
        <h1>String Decryption App</h1>
        <form onSubmit={handleSubmit}>
        <label>Encrypt Data:</label>
        <input
          type="text"
          value={encryptedstring}
          onChange={(e) => setencryptedstring(e.target.value)}
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
      <p>Decrypt Text:{decryptedstring}</p>
      </div>
    );
  }
  
  export default Decrypt;