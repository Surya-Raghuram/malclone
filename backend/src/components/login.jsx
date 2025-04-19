import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        try{
            await axios.post("http://localhost:8080/" ,{
                email, password
            }).then(res =>{
                if(res.data == "exist"){
                    history("/home", {state : {id:email}});
                }
                else if(res.data == "not_exist"){
                    alert("User does not exist");
                }
            })
            .catch(e=>{
                alert("Wrong deatils");
                console.log(e);
            })
        }   
        catch(e){
            console.log(e);
        }
    }


    return (
        <div className="login">
            
            <form action = "POST">
            <h1>Login</h1>
                <input type ="email" onChange={(e) => setEmail(e.target.value)} placeholder="Username"/>
                <input type ="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input type = "submit" onClick={handleLogin}/>
            </form>
            <br />
            <p>OR</p>
            <Link to = "/signup">Sign-up</Link>

        </div>
    );
}
export default Login;