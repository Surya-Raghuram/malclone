import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            await axios.post("http://localhost:5173/signup" ,{
                email, password
            }).then(res =>{
                if(res.data == "exist"){
                    alert("User already exists");
                }
                else if(res.data == "not_exist"){
                    alert("Signed you up");
                    history("/home", {state : {id:email}});
                    
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
        <div className="signup">
            
            <form action = "POST">
                <h1>Signup</h1>
                <input type ="email" onChange={(e) => setEmail(e.target.value)} placeholder="username"/>
                <input type ="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <input type = "submit" onClick={handleLogin}/>
            </form>

            <br />
            <p>OR</p>
            <Link to = "/">login</Link>

        </div>
    );
}
export default Login;