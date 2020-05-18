import React, { useState, FormEvent } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Container, Title, Form, Error, Repositories } from './styles';

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
  const [repositories, setRepositories] = useState<Repository[]>([]);

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
      <a key={repository.full_name} href="teste">
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />
        <div>
        <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
        <BsChevronRight size={20} />
      </a>
      ))}
    </Repositories>
    </Container>
  )
}

export default Dashboard;
