import { useEffect, useState } from "react";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { createAccount } from "../../services/account/accounts.js";
import BankList from "./BankList.js";

const CreateAccount = ({ handelAllAccounts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankId, setBankId] = useState("");

  const handleCreateAccount = async (d) => {
    try {
      setIsLoading((prev) => true);
      if (bankId == "") {
        throw new Error("invalid bank");
      }

      let userId = localStorage.getItem("id");
      const response = await createAccount(userId, { bankId });
      console.log(response.data);
      handelAllAccounts();
      MessageSuccess("Account Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };

  return (
    <>
      <Spinner isLoading={isLoading} />
      <div className="card mx-auto mt-5 mb-5" style={{ width: "20rem" }}>
        <div className="card-body">
          <h4 className="card-title mt-2">Create Account</h4>
          <form>
            <BankList setBankId={setBankId} />
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleCreateAccount}
            >
              Add Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
