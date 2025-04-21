import  {useState} from 'react';
import '../styles/Navbar.css'
import LoginModal from './LoginModal';
import axios from 'axios';


const LoginSignUp = () =>{
    
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  
  async function handleLogin (email: string, password: string)  {
    console.log('Login attempt:', email, password);
    try{
      await axios.post("http://localhost:8080/", { //Ee local host lo backend run avthundi 
        email, password
      }).then(res => {
        if(res.data == "exist"){
          alert("Login Successful!");
        }
        else if(res.data == "not_exist"){
          alert("User doesnot exist!")}  
        
        else if(res.data == "wrong_password"){
          alert("wrong password, diddy coming to your place tonight!");
        }
      
      }
      ).catch(e =>{
        alert("Wrong details");
        console.log(e);
      })
    }
    catch(e) {
      console.log(e);
    }
    setIsLoginModalOpen(false);
  };

  async function handleSignUp (email: string, password: string){
    console.log('Sign up attempt:', email, password);
    try{
      await axios.post("http://localhost:8080/signup", {
        email, password
      }).then(
        (res) => {
          if(res.data == "exist"){
            alert("User already exist");
          }
          else if(res.data == "not_exist"){
          alert("Signed you up");
          console.log(`New nigga in the chat! ${email} ${password}`);
        }
      }
    );
  }  catch(e){
    console.log(e);
  }
    
    
}
    return (
        <div className="sign-in" >
           <button className="login-btn" onClick={()=> setIsLoginModalOpen(true)}>Login</button>
          <button className="sign-in-btn" onClick={()=> setIsSignUpModalOpen(true)} >Sign Up</button>
         
        <LoginModal 
          isOpen = {isLoginModalOpen}
          onClose={()=> setIsLoginModalOpen(false)}
          onLogin={handleLogin} 
          title = "Login"
        />
        <LoginModal 
          isOpen = {isSignUpModalOpen}
          onClose = {()=> setIsSignUpModalOpen(false)}
          onLogin={handleSignUp}
          title ="SignUp"

        />

        </div>
    );
}

export default LoginSignUp;