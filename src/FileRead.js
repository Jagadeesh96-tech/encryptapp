import React, { useState } from "react";

const FileRead = () => {
  const [apiName, setApiName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};

    if (!apiName.trim()) newErrors.apiName = "API Name is required.";
    if (!filePath.trim()) {
      newErrors.filePath = "File Path is required.";
    } else if (!/^[a-zA-Z]:\\[^<>:"|?*]+$/.test(filePath)) {
      newErrors.filePath = "Invalid file path format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const requestBody = {
      ApiName: apiName,
      FilePath: filePath,
    };

    try {
      const response = await fetch("http://localhost:8500/FileProcessingApp/GetFileData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.text();
      setResponse(data);
    } catch (error) {
      setResponse("Error fetching data.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>File Read API</h2>
      <div>
        <label>API Name:</label>
        <input
          type="text"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          style={{ display: "block", width: "100%", padding: "5px", marginBottom: "10px" }}
        />
        {errors.apiName && <p style={{ color: "red" }}>{errors.apiName}</p>}
      </div>
      <div>
        <label>File Path:</label>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          style={{ display: "block", width: "100%", padding: "5px", marginBottom: "10px" }}
        />
        {errors.filePath && <p style={{ color: "red" }}>{errors.filePath}</p>}
      </div>
      <button onClick={handleSubmit} style={{ padding: "10px", cursor: "pointer" }}>
        Fetch File Data
      </button>
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
};

export default FileRead;
