import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
        setRepositories(response.data);
    });
    }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Node#1",
      url: "www.node2.com",
      techs: "seilá",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`, {
      id: id,
    });

    const oldRepos = repositories;
    const repoIndex = oldRepos.findIndex((repo) => {
      return repo.id === id;
    });

    oldRepos.splice(repoIndex, 1);

    setRepositories([...oldRepos]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map((repository) => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
