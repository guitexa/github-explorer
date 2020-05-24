import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import api from '../../services/api';

import { Container, Header, RepositoryInfo, Issues } from './styles';

import logo from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  }
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [darkTheme] = useState(() => {
    const storageTheme = localStorage.getItem('@GithubExplorer:theme');

    if (storageTheme) {
      return Boolean(storageTheme);
    } else {
      return true;
    }
  });
  const [usLanguage, setUsLanguage] = useState(() => {
    return Boolean(localStorage.getItem('@GithubExplorer:language'));
  });

  const [repository, setRepository] = useState<Repository | null>(null)
  const [issues, setIssues] = useState<Issue[]>([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });
    // ?per_page=5&page=${page}
    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);



  // let observer = new IntersectionObserver((entries) => {
  //   let ratio = entries[0].intersectionRatio;
  //   if (ratio > 0 && issues.length >= 5) {
  //     setPage(2);
  //   }
  // }, {
  //   rootMargin: '100px',
  //   threshold: 1,
  // });

  // let target = document.querySelector('#target');

  // {target && observer.observe(target);}

  return (
    <Container>
      <Header>
        <img src={logo} alt="Logo Github Explorer" />
        <Link to={'/'}>
          <BsChevronLeft size={13} />
          {!usLanguage && `Voltar`}
          {!!usLanguage && `Back`}
        </Link>
      </Header>

      {repository &&
      <RepositoryInfo>
      <header>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <div>
          <strong>{repository.full_name}</strong>
          <p>{repository.description}</p>
        </div>
      </header>
      <ul>
        <li>
          <strong>{repository.stargazers_count}</strong>
          <p>
            {!usLanguage && `Estrelas`}
            {!!usLanguage && `Stars`}
            </p>
        </li>
        <li>
          <strong>{repository.forks_count}</strong>
          <p>Forks</p>
        </li>
        <li>
          <strong>{repository.open_issues_count}</strong>
          <p>
            {!usLanguage && `Issues abertas`}
            {!!usLanguage && `Open Issues`}
            </p>
        </li>
      </ul>
      </RepositoryInfo>
      }

      <Issues>
        {issues.map((issue) => (
        <a key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>
          <BsChevronRight size={20} />
        </a>
        ))}
      {/* <div id="target"></div> */}
      </Issues>
    </Container>
  )
}

export default Repository;
