import API from '../config'

// fetch API for backend connection
export const createCategory = (userId , token , category) =>{
   
  return fetch(`${API}/category/create/${userId}`,{
       method:"POST" ,
       headers:{
          Accept:'application/json' ,
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
       },
       body: JSON.stringify(category),
       mode:"cors"
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
};



// fetch API for backend connection
export const createProduct = (userId , token , product) =>{
   
    return fetch(`${API}/product/create/${userId}`,{
         method:"POST" ,
         headers:{
            Accept:'application/json' ,
            Authorization:`Bearer ${token}`
         },
         body: product,            //form data
         mode:"cors"
      })
      .then(response =>{
          return response.json()
      })
      .catch(err =>{
          console.log(err);
      })
  };
  
//for accessing all categories
export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}


/**
 * to perform crud on products
 * list of prod
 * get single prod
 * update single prod
 * delete single prod
 */

 //for accessing all products
export const getProducts = () =>{
    return fetch(`${API}/products?limit=undefind`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}

//for deleting product
export const deleteProduct = (productId , userId , token) =>{
   
    return fetch(`${API}/product/${productId}/${userId}`,{
         method:"DELETE" ,
         headers:{
            Accept:'application/json' ,
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
         },
         mode:"cors"
      })
      .then(response =>{
          return response.json()
      })
      .catch(err =>{
          console.log(err);
      })
  };

  //to get single prod
export const getProduct = (productId) =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}

// to update single prod
export const updateProduct = (productId , userId , token, product) =>{
   
    return fetch(`${API}/product/${productId}/${userId}`,{
         method:"PUT" ,
         headers:{
            Accept:'application/json' ,
            // "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
         },
         body: product,
         mode:"cors"
      })
      .then(response =>{
          return response.json()
      })
      .catch(err =>{
          console.log(err);
      })
  };

  //for accessing all orders
export const listOrders = (userId, token) =>{
    return fetch(`${API}/order/list/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json' ,
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
         },
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
}