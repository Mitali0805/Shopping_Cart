import React,{useState,useEffect} from 'react';
import Layout from './Layout';
import { getProducts , getBraintreeClientToken, processPayment , createOrder} from './apiCore';
import { emptyCart } from './cartProcess'
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, setRun = f => f, run = undefined }) =>{

   const [data,setData] = useState({
      success:false,
      loading:false,
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
            setData({ clientToken: data.clientToken });
         }
      });
   };

   useEffect(()=>{
      getToken(userId,token);
   },[]);

   const handleAddress = event => {
      setData({...data,address:event.target.value});
   }

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
           <button className="btn btn-success">Signin</button>
         </Link>
      );
   };

   let deliveryAddress = data.address

   const buy = () => {
      setData({loading:true});
      //send nonce to server
      //nonce = data.instance.requestPaymentMethod()
      let nonce;
      let getNonce = data.instance.requestPaymentMethod()
      .then(data =>{
         console.log(data)
         nonce = data.nonce
         //once you have nonce (card type, card no) send nonce as 'paymentMethodNonce'
         //and also total to be charged
         console.log('send nonce and total to process:',nonce,getTotal(products))

         const paymentData = {
            paymentMethodNonce : nonce,
            amount: getTotal(products)
         }

         processPayment(userId, token, paymentData)
            .then(response => {
               console.log(response)
               //empty cart
               //create order

              const createOrderData = {
                 products: products,
                 transaction_id: response.transaction.id,
                 amount: response.transaction.amount,
                 address: deliveryAddress
              }

               createOrder(userId, token, createOrderData)
               .then(response => {
                  setData({...data, success: response.success});
                  emptyCart(() =>{
                     setRun(!run); //update parent state
                     console.log('payment success & empty cart');
                     setData({
                        loading:false,
                        success: true
                     })
                  });
               })
            })
            .catch(error =>{
               console.log(error)
               setData({loading:false});
            });
      })
      .catch(error =>{
         console.log('dropin error:',error)
         setData({...data, error:error.message})
      })
   }

   //payment gateway
   const showDropIn = () => (
      <div onBlur={() => setData({...data, error:''})}>
         {data.clientToken !== null && products.length > 0 ? (
            <div>
               {/* address */}
                <div className="form-group">
                   <label className="text-muted">delivery address:</label>
                   <textarea 
                        onChange={handleAddress} 
                        value={data.address} 
                        className="form-control"
                  />
                </div>

               <DropIn options={{
                  authorization: data.clientToken
               }} onInstance={instance => (data.instance = instance)}/>
               <button onClick={buy} className="btn btn-warning btn-block">Checkout</button>
            </div>
         ) : null}
      </div>
   );

   const showError = error => (
      <div className="alert alert-danger" 
           style={{display:error ? '' : 'none'}} >
              {error}
      </div>
   );

   const showSuccess = success => (
      <div className="alert alert-success" 
           style={{display: success ? '' : 'none'}} >
             Thank You !! Payment Successful
      </div>
   )

   const showLoading = loading => (
      <div className="alert alert-danger" 
           style={{display: loading ? '' : 'none'}} >
             Loading...
      </div>
   )
   
   return (
       <div>
         <h4>Total: ₹{getTotal()}</h4>
         {showLoading(data.loading)}
         {showSuccess(data.success)}
         {showError(data.error)}
         {showCheckout()}
       </div>
   )
}

export default Checkout;


