import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom'
import { BsChevronRight } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Container, Title, Form, Error, Repositories, Repository } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories])

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite um nome de repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);

      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Repositório não encontrado');
    }
  }
  function handleRemoveRepository(repoName: string): void {
    const getIndex = repositories.findIndex(obj => obj.full_name === repoName);

    repositories.splice(getIndex, 1);
    setRepositories([...repositories]);
  };

  return (
    <Container>
    <img src={logo} alt="Logo Github Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
      <input
        autoFocus={true}
        value={newRepo}
        onChange={(e) => setNewRepo(e.target.value)}
        placeholder="Digite o nome do repositório"
      />
      <button type="submit">Pesquisar</button>
    </Form>

    <Error>{inputError}&nbsp;</Error>

    <Repositories>
      {repositories.map(repository => (
      <Repository key={repository.full_name}>
      <button onClick={() => handleRemoveRepository(repository.full_name)}><RiCloseLine size={20}/></button>
      <Link to={`/repository/${repository.full_name}`}>
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <BsChevronRight size={20} />
      </Link>
      </Repository>
      ))}
    </Repositories>
    </Container>
  )
}

export default Dashboard;
