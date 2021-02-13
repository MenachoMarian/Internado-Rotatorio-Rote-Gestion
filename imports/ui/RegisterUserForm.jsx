
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React, { useState, Fragment} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { OficinasCollection, UsersCollection } from '../db/ListsCollection';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";
  import { useHistory } from "react-router-dom";
  
  
  
  import '../styles/Styles.css';
  import imagenes from '../images/imagenes'
import { Nav } from './Navbar';
import {Home} from './Home';
import { App } from './App';
import {UIADMIN} from './UIADMIN'

export const RegisterUserForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [oficina, setOficina] = useState("");

    const history = useHistory();

    const user = useTracker(() => Meteor.user());
    const userId = useTracker(() => Meteor.userId());
    //const [email, setEmail]=useState("");

    const { ofis } = useTracker(() => {
        const handlerofis = Meteor.subscribe('oficinas');
        if(!handlerofis.ready()) {
          console.log("no hay");
        }
        const ofis = OficinasCollection.find().fetch();

        return {ofis};
    });

    const postregister = () => {
      console.log();
      Roles.addUsersToRoles(this.userId, 'normal-user')
    }


    const handleSubmit = e => {
        e.preventDefault();

                /*Accounts.createUser({
                    username: username,
                    password: password,
                    profile: {
                        oficina: oficina
                    }
                });*/
                Meteor.call('users.insert', username,password,oficina);
                

        setUsername("");
        setPassword("");    
        
        history.push("/Home");
    };

return (
    <div>
          {user ? (
            userId == "q3w3ELFTmkPApjQez" ?(
             <UIADMIN/>
            ):(
              <App/>
            )
          
        ) : (
        <div className="Body">
            <div className="hero">
                <Nav/>
                <div className="menu">
                  <ul>
                    <li><Link to="/Home">Login</Link></li>
                  </ul>
                </div>
            </div>
            <div className="contenido"> 

                <form className="register" onSubmit={handleSubmit}>
                <h4>Registro</h4> <br/>
                <input 
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    /> <br/>
               <input 
                    type="password"
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    /> <br/>
                <select 
                    required
                    className="select-box"
                    value={oficina}
                    onChange={(e) =>{setOficina(e.currentTarget.value)
                    console.log(e.currentTarget.value);}}>
                      <option value="Undefined" defaultValue> Seleccionar oficina</option>
                         {ofis.map(ofi => (
                      <option
                        key={ofi.oficinanombre} 
                        value={ofi.oficinanombre}
                      >
                        {ofi.oficinanombre}     ({ofi.oficinacode})
                      </option>
                        ))}
                      </select> <br/> 

                        <button
                        type="submit"
                        className="btn btn-dark" 
                        > 
                        Registrarse   
                        </button>
                </form>
            </div>
        </div>
        
        )}
          
        
    </div> 
        
    );
};