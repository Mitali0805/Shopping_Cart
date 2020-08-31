import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import { getProducts , getBraintreeClientToken, processPayment} from './apiCore';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products}) =>{

   const [data,setData] = useState({
      success:false,
      clientToken: null,
      error:'',
      instance: {},  //react braintree drop-in
      address: ''
   })

   const userId = isAuthenticated() && isAuthenticated().user._id
   const token = isAuthenticated() && isAuthenticated().token

   const getToken = (userId,token) =>{
      getBraintreeClientToken(userId,token).then(data=>{
         if(data.error) {
            console.log(data.error)
            setData({...data, error: data.error});
         } else {
            console.log(data);
            setData({...data,clientToken: data.clientToken});
         }
      });
   };

   useEffect(()=>{
      getToken(userId,token);
   },[]);

   const getTotal = () =>{
      return products.reduce((currentValue, nextValue) => {
         return currentValue + nextValue.count * nextValue.price ;
      },0);
   };

   const showCheckout = () => {
     return isAuthenticated() ? (
         <div>{showDropIn()}</div>
      ) : (
         <Link to="/signin">
           <button className="btn btn-success">Please Signin</button>
         </Link>
      );
   };

   const buy = () => {
      //send the [nonce = data.instance.requestPaymentMethod() ] to server
      let nonce;
      let getNonce = data.instance
       .requestPaymentMethod()
       .then(data => {
          //console.log(data);
          nonce = data.nonce;
          //console.log(nonce);
          //once you have nonce (card type,card no.) send nonce as 'payementMethodNonce'
          //and also total to be charged
         //  console.log('send nonce and total to process:',
         //              nonce,
         //              getTotal(products));
         const paymentData = {
            payementMethodNonce: nonce,
            amount: getTotal(products),
         };
           
         //console.log(paymentData);
         processPayment(userId, token, paymentData)
         .then(data => {
            console.log(data);
            //setData({...response, success:response.success}); 
            //empty cart
            //create order
         })
         .catch(error => console.log(error));

       })
       .catch(error => {
          console.log('dropin error:',error);
          setData({...data, error:error.message});
       });
   };

   //payment gateway
   const showDropIn = () => (
      <div onBlur={() => setData({...data, error:''})}>
         {data.clientToken !== null && products.length > 0 ? (
            <div>
               <DropIn options={{
                  authorization: data.clientToken
               }} onInstance={instance => (data.instance = instance)}/>
               <button  onClick={buy} className="btn btn-warning btn-block">Checkout</button>
            </div>
         ) : null}
      </div>
   );

   const showError = error => ( 
      <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
         {error}
      </div>
   );

   const showSuccess = success => ( 
      <div className="alert alert-success" style={{ display: success ? "" : "none"}}>
         Thanks! Payment Successful
      </div>
   );   

   return (
       <div>
         <h4>Total: ₹{getTotal()}</h4>
         {/* {showSuccess(data.success)} */}
         {/* {showError(data.error)} */}
         {showCheckout()}
       </div>
   )
}

export default Checkout;


