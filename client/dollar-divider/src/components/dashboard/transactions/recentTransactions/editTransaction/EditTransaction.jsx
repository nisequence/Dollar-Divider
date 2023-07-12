import React from 'react'
import { Button } from 'reactstrap';
export default function EditTransaction(props) {
    // console.log("edittransactionprops",props)
    console.log("edittransactionprops",props)
    async function updateTransaction () {
        let url = `http://localhost:4000/transaction/edit/${props.id}`;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);
        // let desc = props.desc.current.value;
        // let merchant = props.merchant.current.value;
        // let finAccount = props.finAccount.current.value;
        // let category = props.category.current.value;
        const updateObj = JSON.stringify({
          month: props.month,
          day: props.day,
        //   desc: desc,
        //   merchant: merchant,
        //   amount: Number(props.amount),
        //   finAccount: finAccount,
        //   category: category,
        //   type: props.transactionType,
        //   base: props.base,
        });
    
        let requestOptions = {
          headers: myHeaders,
          body: updateObj,
          method: "PATCH",
        };
    
        try {
          let response = await fetch(url, requestOptions);
          let data = await response.json();
          if (data.message === `Transaction has been updated successfully`) {
            props.getTransaction();
          }
        } catch (error) {
          console.error(error);
        }
      };
      props.getTransaction()
  return (
    <>
            <Button color="success" onClick={updateTransaction}>
        Update
        {/* <BsFillEnvelopeSlashFill /> Delete */}
      </Button>
    </>
  )
}
