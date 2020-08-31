import React,{useState,useEffect} from 'react';
import Layout from './Layout';

import { read } from './apiCore';
import Cards from './Cards'

const Product = (props) =>{

    const [product,setProduct] = useState({})
    const [error,setError] = useState(false)

    const loadSingleProduct = productId =>{
        read(productId).then(data =>{
            if(data.error) {
                setError(data.error);
            } else {
                setProduct(data);
            }
        })
    }

    //for grabbing productId from route parameters when component mount
    useEffect(() =>{
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    },[])

    return(
        <Layout  className="container-fluid">
            <h2 className="mb-4 mt-3" style={{fontFamily:'fantasy',textAlign:'center'}}>E-Shopping Zone</h2>
            <div className="container col-5">
               { product && product.description && <Cards product={product} showAddToCartButton={true}  /> }
            </div>
            
        </Layout>
       );
}

export default Product