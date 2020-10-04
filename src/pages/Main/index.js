import React, { useState } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Cointaner, Form, SubmitButton } from './styles';

const Main = () => {
   const [newRepo, setNewRepo] = useState('');

   const handleChange = () => {
      console.log(newRepo);
   };

   return (
      <Cointaner>
         <h1>
            <FaGithubAlt />
            Repositórios
         </h1>

         <Form
            onSubmit={(e) => {
               e.preventDefault();
               handleChange();
            }}
         >
            <input
               type="text"
               placeholder="Adicionar repositório"
               value={newRepo}
               onChange={(e) => {
                  setNewRepo(e.target.value);
               }}
            />

            <button
               onClick={() => {
                  handleChange();
               }}
            >
               oi
            </button>

            <SubmitButton disabled>
               <FaPlus color="#fff" size={16} />
            </SubmitButton>
         </Form>
      </Cointaner>
   );
};

export default Main;
