import React, { useState, useEffect, FormEvent } from 'react';
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

    const checkExists = repositories.find(e => e.full_name === newRepo);

    if (checkExists) {
      setInputError('Este repositório já foi adicionado');
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

  document.onkeyup = eventKeyUp;
  function eventKeyUp(e: any) {
    if ((e.key === 'Backspace') && (inputError !== '' && newRepo === '')) {
      setInputError('');
    }
  }

  document.onkeydown = eventKeyDown;
  function eventKeyDown(e: any) {
    if (e.key === 'Escape') {
      setRemove('')

      if (inputError !== '' && newRepo === '') {
        setInputError('');
      }
    }
  }

  window.onclick = (e: any) => {
    const getClassName = e.target.parentNode.className;
    const getNodeName = e.target.parentNode.nodeName.toLowerCase();
    const getBaseVal = e.target.className.baseVal;

    if (getClassName !== 'confirmed' && getBaseVal !== '') {
      setRemove('')
    }

    if (getNodeName !== 'form' && (inputError !== '' && newRepo === '')) {
      setInputError('');
    }
  }


  const [remove, setRemove] = useState('');

  function handleRemoveRepository(repoName: string): void {
    const getIndex = repositories.findIndex(obj => obj.full_name === repoName);

    repositories.splice(getIndex, 1);
    setRepositories([...repositories]);
    setRemove('');
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
      <Repository key={repository.full_name} hasConfirmed={remove.includes(repository.full_name)}>
        {remove.includes(repository.full_name) && <button id={`confirmed${repository.full_name.replace(/\//g, '')}`} className="confirmed" onClick={() => handleRemoveRepository(repository.full_name)}><RiCloseLine size={20}/></button>}
        {!remove.includes(repository.full_name) && <button id={`unconfirmed${repository.full_name.replace(/\//g, '')}`}  className="unconfirmed" onClick={() => setRemove(repository.full_name)}><RiCloseLine size={20}/></button>}
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
