import React, { useEffect, useState } from 'react'
import { getBanks } from "../../services/bank/banks";
import { MessageError } from '../../error/Errors';


const BankList = ({setBankId}) => {

    const [banks, setBanks]=useState([])

    const Blist= banks.map(bank => {
      return(<option key={bank.id} value={bank.id}>{bank.bankName}</option>)
    }); 
    

    const getListBanks=async()=>{
        try {
          let response = await getBanks()
          setBanks(prev=>response.data)
          console.log(">>>>>>>>>>>>",banks)

        } catch (error) {
          MessageError("could not load data to dropdown")
        }
        }

    useEffect(() => {
        getListBanks()
      }, [])
  return (<>
        <select className="custom-select form-control" style={{borderRadius:"5px"}}
        onChange={(e) => {
            setBankId(e.target.value);
          }}>
          <option value="" selected>
          select
          </option>
          {Blist}
        </select>
  </>
  )
}

export default BankList