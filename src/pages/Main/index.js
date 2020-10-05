import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Cointaner, Form, SubmitButton, List } from './styles';

const Main = () => {
   const [newRepo, setNewRepo] = useState('');
   const [repositories, setRepositories] = useState([]);
   const [loading, setLoading] = useState(false);

   async function handleSubmit(e) {
      e.preventDefault();

      setLoading(true);

      const response = await api.get(`/repos/${newRepo}`);
      console.log(response.data);

      const data = {
         name: response.data.full_name,
      };

      setNewRepo('');
      setRepositories([...repositories, data]);
      setLoading(false);
   }

   return (
      <Cointaner>
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
                  <Link to="">Detalhes</Link>
               </li>
            ))}
         </List>
      </Cointaner>
   );
};

export default Main;
