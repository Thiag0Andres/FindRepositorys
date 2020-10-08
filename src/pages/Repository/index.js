import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import PropTypes from 'prop-types';

import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';

import Container from '../../components/container';
import { Loading, Owner, IssueList } from './styles';

const Repository = ({ match }) => {
   //PropTypes
   /*    const propTypes = {
      match: PropTypes.shape({
         params: PropTypes.shape({
            repository: PropTypes.string,
         }),
      }),
   }; */

   //Estados
   const [repository, setRepository] = useState({});
   const [issues, setIssues] = useState([]);
   const [loading, setLoading] = useState(true);

   //Função que faz requisão na api
   async function handleInformations() {
      try {
         const repoName = decodeURIComponent(match.params.repository);

         const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`),
         ]);

         console.log(repository);
         console.log(issues);

         setRepository(repository.data);
         setIssues(issues.data);
         setLoading(false);
      } catch (err) {
         alert('Falha ao encontrar os dados repositório');
         setLoading(true);
      }
   }

   //Executa a função de requisição
   useEffect(() => {
      handleInformations();
      // eslint-disable-next-line
   }, []);

   if (loading) {
      return <Loading>Carregando</Loading>;
   }

   return (
      <Container>
         <Owner>
            <Link to="/">
               <FiArrowLeft /> Voltar aos repositórios
            </Link>
            <img
               src={repository.owner.avatar_url}
               alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
         </Owner>
         <IssueList>
            {issues.map((issue) => (
               <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                     <strong>
                        <a href={issue.html_url}>{issue.title}</a>
                        {issue.labels.map((label) => (
                           <span key={String(label.id)}>{label.name}</span>
                        ))}
                        <p>{issue.user.login}</p>
                     </strong>
                  </div>
               </li>
            ))}
         </IssueList>
      </Container>
   );
};

export default Repository;
