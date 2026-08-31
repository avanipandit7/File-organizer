import { useState, useEffect } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      if (Array.isArray(data)) setLogs(data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await fetch('/api/logs');
        const data = await res.json();
        if (Array.isArray(data)) setLogs(data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      }
    };

    loadLogs();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok) {
        setGenerated(data);
        setText('');
        await fetchLogs();
      } else {
        setError(data.error || 'The prompt could not be processed.');
      }
    } catch (err) {
      console.error(err);
      setError('The server could not be reached.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/logs/${id}`, { method: 'DELETE' });
      if (res.ok) fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">LOCAL FILE WORKSHOP</p>
        <h1>Make something real<br /><span>from a sentence.</span></h1>
        <p className="intro">Describe the file you want. The server creates it, stores the run, and brings the result back here.</p>
      </header>

      <form onSubmit={handleGenerate} className="prompt-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create text file and add Hello world to it"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create files'}
        </button>
      </form>
      {error && <p className="error-message" role="alert">{error}</p>}

      {generated && (
        <section className="result-panel" aria-live="polite">
          <div>
            <p className="eyebrow">JUST CREATED</p>
            <h2>{generated.textFile ? generated.textFile.filename : 'Export bundle ready'}</h2>
            <p>{generated.textFile ? 'Your text file is ready to open or download.' : 'Your PDF and image exports are ready.'}</p>
          </div>
          <div className="result-links">
            {generated.textFile && <a href={generated.textFile.url} download>Text file</a>}
            <a href={generated.pdfUrl} target="_blank" rel="noreferrer">PDF</a>
            <a href={generated.imageUrl} target="_blank" rel="noreferrer">PNG</a>
          </div>
        </section>
      )}

      <section className="history-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACTIVITY</p>
            <h2>Generated history</h2>
          </div>
          <span>{logs.length} {logs.length === 1 ? 'run' : 'runs'}</span>
        </div>
      <div className="table-wrap"><table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prompt</th>
            <th>Downloads</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.input_text}</td>
              <td className="downloads">
                {item.pdf_path && <a href={`/files/${item.pdf_path}`} target="_blank" rel="noreferrer">PDF</a>}
                {item.image_path && <a href={`/files/${item.image_path}`} target="_blank" rel="noreferrer">PNG</a>}
              </td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div></section>
    </main>
  );
}