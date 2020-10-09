import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/container';
import { Form, SubmitButton, List } from './styles';

const Main = () => {
   //Estados
   const [newRepo, setNewRepo] = useState('');
   const [repositories, setRepositories] = useState([]);
   const [loading, setLoading] = useState(false);

   //Função que faz requisão na api
   async function handleSubmit(e) {
      e.preventDefault();

      setLoading(true);

      try {
         const response = await api.get(`/repos/${newRepo}`);
         console.log(response.data);

         const data = {
            name: response.data.full_name,
         };
         setNewRepo('');
         setRepositories([...repositories, data]);
         setLoading(false);
      } catch (err) {
         alert(
            'Falha ao encontrar o repositório, verifique se o nome do repositório está correto'
         );
         setNewRepo('');
         setLoading(false);
      }
   }

   //Carrega os dados do localStorage
   useEffect(() => {
      const repositories = localStorage.getItem('repositories');

      if (repositories) {
         setRepositories(JSON.parse(repositories));
      }
   }, []);

   //Salva os dados do localStorage
   useEffect(() => {
      localStorage.setItem('repositories', JSON.stringify(repositories));
   }, [repositories]);

   /*    //Limpa todos os dados do localStorage
   useEffect(() => {
      localStorage.clear();
   }, []); */

   return (
      <Container>
         <h1>
            <FaGithubAlt />
            Repositórios
         </h1>

         <Form onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Adicionar repositório"
               value={newRepo}
               onChange={(e) => setNewRepo(e.target.value)}
            />

            <SubmitButton loading={loading}>
               {loading ? (
                  <FaSpinner color="#fff" size={16} />
               ) : (
                  <FaPlus color="#fff" size={16} />
               )}
            </SubmitButton>
         </Form>

         <List>
            {repositories.map((repository) => (
               <li key={repository.name}>
                  <span>{repository.name}</span>
                  <Link
                     to={`/repository/${encodeURIComponent(repository.name)}`}
                  >
                     Detalhes
                  </Link>
                  {/*                   <button onClick={handleDelete} type="button">
                     Remover
                  </button> */}
               </li>
            ))}
         </List>
      </Container>
   );
};

export default Main;
