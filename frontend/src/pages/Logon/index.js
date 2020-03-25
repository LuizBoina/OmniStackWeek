import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import HeroesImg from '../../assets/heroes.png';
import LogoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
const Logon = () => {
    const [id, setId] = useState('');
    const history = useHistory();

    const handleLogin = async e => {
        e.preventDefault();
        try {
            const response = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push("/profile");
        }
        catch (err) {
            alert('falha no login tente novamente');
            console.log(err);
        }
    };
    return (
    <div className="logon-container">
        <section className="form">
            <img src={LogoImg} alt="Be The Hero" />
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setId(e.target.value)}/>
                <button className="button" type="submit">Entrar</button>
                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>
        </section>
        <img src={HeroesImg} alt="Heroes"/>
    </div>
    )
};

export default Logon;