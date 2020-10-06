import React, { useEffect, useState } from 'react';

import api from '../../services/api';

const Repository = ({ match }) => {
   //Estados
   const [repository, setRepository] = useState({});
   const [issues, setIssues] = useState([]);
   const [loading, setLoading] = useState(true);

   //Função que faz requisão na api
   async function handle() {
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
      handle();
   });

   return <h1>Repository</h1>;
};

export default Repository;
