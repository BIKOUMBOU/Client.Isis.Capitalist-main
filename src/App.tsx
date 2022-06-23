import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import './components/Main';
import Main from './components/Main';

const placeholder = 'Nom du joueur'


const GET_WORLD = gql`
  query  {
    getWorld {
   
      name
      logo
      money
      score
      totalangels
      activeangels
      angelbonus
      lastupdate
      products {
        id
        name
        logo
        cout
        croissance
        revenu
        vitesse
        quantite
        timeleft
        managerUnlocked
      }

      allunlocks {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }

      upgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }

      angelupgrades {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }

      managers {
        name
        logo
        seuil
        idcible
        ratio
        typeratio
        unlocked
      }
    }
  }`


const App = () => {
    let name = localStorage.getItem("username");
    if (!name){
        name = "Josse" + Math.round(Math.random()*1000)
    }

    const [username, setUsername] = useState("name"); // Quel est le pseudo

    const {loading, error, data, refetch} = useQuery(GET_WORLD, {
           context: {headers: {"x-user": username}}
    });

    // Changer de Joueur
    function changeUser(event: { target: any; }) {
        setUsername(event.target.value);
        localStorage.setItem("username", username);
    }

    // Mettre à jour le Username du Joueur
    function onUserNameChanged(event: React.FormEvent<HTMLInputElement>)  {
        setUsername(event.currentTarget.value);
        localStorage.setItem("username", username);
        console.log(event.currentTarget.value);

    }

    let corps = undefined
    if (loading) corps = <div> Loading... </div>
    else if (error) corps =
         <div> Erreur de chargement du monde ! </div>
    else {
        corps = <Main loadworld={data.getWorld} username={username} />
    }

    return (
        <div className="App">
            {corps}
            <div className="IdJoueur">
                <input type="text" value={username} placeholder={placeholder} onChange={changeUser} />
                <button onClick={() => refetch()}>Valider</button>
            </div >
        </div >);
}

export default App;
