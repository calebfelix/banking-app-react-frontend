import { useState } from "react";
import { createUser } from "../../services/user/users";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { createBank } from "../../services/bank/banks";


const CreateBank = ({handelAllBanks})=>{
  const [isLoading, setIsLoading] = useState(false)
    const [bankName, setBankName] = useState("")

    const handleCreateBank = async(e)=>{
      try {
      setIsLoading(prev=>true)
        e.preventDefault()
        if(bankName==""){
          throw new Error("invalid bank Name")
        }


        const response = await createBank(bankName)
        console.log(response.data)
        handelAllBanks()
        MessageSuccess("Bank Added")
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
      <h4 className="card-title mt-2">Create Bank</h4>
      <form>
        <div className="form-group mt-2">
          <label>Bank Name</label>
          <input
            onChange={(e) => {
              setBankName(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="my Bank"
          ></input>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleCreateBank}>
          Add Bank
        </button>
     </form>
    </div>
  </div>
</>
  );
}

export default CreateBank