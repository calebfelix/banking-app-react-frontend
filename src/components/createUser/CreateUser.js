import { useState } from "react";
import { createUser } from "../../services/user/users";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";


const CreateUser = ({handelAllUsers})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleCreateUser = async(e)=>{
      try {
      setIsLoading(prev=>true)
        e.preventDefault()
        if(name==""){
          throw new Error("invalid name")
        }
        if(age==""){
          throw new Error("invalid age")
        }

        if(gender==""){
          throw new Error("invalid gender")
        }
        if(email==""){
          throw new Error("invalid email")
        }
        if(username==""){
          throw new Error("invalid username")
        }
        if(password==""){
          throw new Error("invalid password")
        }


        const response = await createUser(name,Number(age),gender,email,username,password)
        console.log(response.data)
        handelAllUsers()
        MessageSuccess("user Added")
        return
      } catch (error) {
        MessageError(error.message)
      }finally{
        setIsLoading(prev=>false)
      }
    }

  return (
<>
<Spinner isLoading={isLoading} />
    <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
    <div className="card-body">
      <h4 className="card-title mt-2">Create User</h4>
      <form>
        <div className="form-group mt-2">
          <label>Name</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Jon"
          ></input>
        </div>
        <div className="form-group mt-2">
          <label>Age</label>
          <input
            onChange={(e) => {
              setAge(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="20">
        </input>
        </div>
        <div className="form-group mt-2">
          <label>Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            className="form-control"
            placeholder="jon@doe.com">
        </input>
        </div>
        <label>Gender</label>
        <select 
          className="custom-select form-control" style={{borderRadius:"5px"}}
          onChange={(e) => {
            setGender((prev) => e.target.value);
          }}
        >
          <option value="" selected>
          select
          </option>
          <option value="male">
          male
          </option>
          <option value="female" >
          female
          </option>
          <option value="others" >
          others
          </option>
        </select>

        <div className="form-group mt-2">
          <label>Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="jon">
        </input>
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="password123">
        </input>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateUser}>
          Add User
        </button>
     </form>
    </div>
  </div>
</>
  );
}

export default CreateUser