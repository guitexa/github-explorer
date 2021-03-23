import React, {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight, BsMoon } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import { MdSettings, MdBrightnessHigh } from 'react-icons/md';
import Switch from '@material-ui/core/Switch';

import api from '../../services/api';
import { useLang } from '../../hooks/LangContext';
import { useTheme } from '../../hooks/ThemeContext';

import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import BrFlag from '../../assets/br-flag.png';
import UsFlag from '../../assets/us-flag.png';

import {
  Container,
  Header,
  Title,
  Form,
  Error,
  Repositories,
  Repository,
} from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { language, switchLanguage } = useLang();
  const { theme, switchTheme } = useTheme();
  const [newRepo, setNewRepo] = useState('');
  const [remove, setRemove] = useState('');

  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer: repositories'
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  console.log('testouuu')

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer: repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  // Função para adicionar um novo repositório
  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite um nome de repositório');
      return;
    }

    const checkExists = repositories.find(
      (e) => e.full_name.toLowerCase() === newRepo.toLowerCase()
    );

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

  // Função para remover um repositório
  function handleRemoveRepository(repoName: string): void {
    const getIndex = repositories.findIndex(
      (obj) => obj.full_name === repoName
    );

    repositories.splice(getIndex, 1);
    setRepositories([...repositories]);
    setRemove('');
  }

  document.onkeyup = eventKeyUp;
  function eventKeyUp(e: any) {
    if (e.key === 'Backspace' && inputError !== '' && newRepo === '') {
      setInputError('');
    }
  }

  document.onkeydown = eventKeyDown;
  function eventKeyDown(e: any) {
    if (e.key === 'Escape') {
      setRemove('');

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
      setRemove('');
    }

    if (getNodeName !== 'form' && inputError !== '' && newRepo === '') {
      setInputError('');
    }
  };

  return (
    <Container>
      <Header
        hasSwitchTheme={theme === 'dark' ? false : true}
        hasSwitchLanguage={language}
      >
        {theme === 'dark' && <img src={LogoDark} alt="Logo Github Explorer" />}
        {theme === 'light' && (
          <img src={LogoLight} alt="Logo Github Explorer" />
        )}
        <div id="settings">
          <button>
            <MdSettings size={25} />
          </button>
          <div id="menu" className="hidden">
            <button>
              <BsMoon size={20} />
              <Switch
                checked={theme === 'dark' ? false : true}
                onChange={switchTheme}
                size="small"
              />
              <MdBrightnessHigh size={20} />
            </button>
            <button>
              <img src={BrFlag} height={20} />
              <Switch
                checked={language}
                onChange={switchLanguage}
                size="small"
              />
              <img src={UsFlag} height={20} />
            </button>
          </div>
        </div>
      </Header>
      <Title>
        {!language && `Explore repositórios no Github`}
        {!!language && `Explore Github repositories`}
      </Title>
      <Form
        hasSwitchTheme={theme === 'dark' ? false : true}
        hasError={!!inputError}
        onSubmit={handleAddRepository}
      >
        {!language && (
          <input
            autoFocus={true}
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="Digite o nome do repositório"
          />
        )}
        {!!language && (
          <input
            autoFocus={true}
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
            placeholder="Type a repository name"
          />
        )}
        <button type="submit">
          {!language && `Pesquisar`}
          {!!language && `Search`}
        </button>
      </Form>

      <Error>{inputError}&nbsp;</Error>

      <Repositories>
        {repositories.map((repository) => (
          <Repository
            hasSwitchTheme={theme === 'dark' ? false : true}
            key={repository.full_name}
            hasConfirmed={remove.includes(repository.full_name)}
          >
            {remove.includes(repository.full_name) && (
              <button
                id={`confirmed${repository.full_name.replace(/\//g, '')}`}
                className="confirmed"
                onClick={() => handleRemoveRepository(repository.full_name)}
              >
                <RiCloseLine size={20} />
              </button>
            )}
            {!remove.includes(repository.full_name) && (
              <button
                id={`unconfirmed${repository.full_name.replace(/\//g, '')}`}
                className="unconfirmed"
                onClick={() => setRemove(repository.full_name)}
              >
                <RiCloseLine size={20} />
              </button>
            )}
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
  );
};

export default Dashboard;
