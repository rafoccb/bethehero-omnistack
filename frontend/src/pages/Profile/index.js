import React, {useEffect, useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import { FiPower , FiTrash2, FiEdit} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push(`incidents/new/${id}`);
            // setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    async function handleUpdateIncident(id){
        try {
            await api.put(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id === id));
        } catch (error) {
            alert('Erro ao enviar dados para atualizar, tente novamente');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt=" Be The Hero "/>
                <span>Bem vinda, {ongName} </span>

                <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>
                <Link to="/"> 
                    <button onClick={handleLogout} type="button">
                        <FiPower size={24} color="#e02041"/>
                    </button>
                </Link>
            </header>

            <h1> Casos cadastrados </h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong> CASO: </strong>
                        <p> {incident.title} </p>

                        <strong> DESCRIÇÂO: </strong>
                        <p> {incident.description} </p>

                        <strong> VALOR: </strong>
                        <p> 
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </p>
                        <div className="group-buttons">
                            <button onClick={() => handleUpdateIncident(incident.id)} type="button">
                                <FiEdit size={20} />
                            </button>
                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}