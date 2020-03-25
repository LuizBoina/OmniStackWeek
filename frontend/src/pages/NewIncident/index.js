import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css'

const NewIncident = () => {
    const initialState = {
        title: '',
        description: '',
        value: ''
    };
    const ongId = localStorage.getItem('ongId');
    const [state, setState] = useState(initialState);
    const history = useHistory();

    const handleInputChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleNewIncident = async e => {
        e.preventDefault();
        try {
            await api.post('incidents', state, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push('/profile');
        }
        catch (err) {
            alert('Erro ao cadastrar caso');
            console.log(err);
        }
    };

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Título do caso" 
                    name="title"
                    value={state.title}
                    onChange={handleInputChange}/>

                    <textarea type="email" placeholder="Descrição"
                    name="description"
                    value={state.description}
                    onChange={handleInputChange}/>
                    <input type="text" placeholder="Valor em reais"
                    name="value"
                    value={state.value}
                    onChange={handleInputChange}/>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewIncident;