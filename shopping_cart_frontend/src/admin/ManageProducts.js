import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { getProducts , deleteProduct} from './ApiAdmin';
import { Link } from 'react-router-dom';

import { Icon, InlineIcon } from '@iconify/react';
import baselineDelete from '@iconify/icons-ic/baseline-delete';
import updateIcon from '@iconify/icons-mdi/update';
import editIcon from '@iconify/icons-zmdi/edit';



const ManageProducts = () => {

   const [products,setProducts] = useState([])

   const {user,token} = isAuthenticated()

   const loadProducts = () =>{
      getProducts().then(data =>{
         if(data.error) {
            console.log(data.error)
         } else {
            setProducts(data)
         }
      })
   }

   const destroy = productId => {
      deleteProduct(productId,user._id,token).then(data =>{
         if(data.error) {
            console.log(data.error)
         } else {
            loadProducts()
         }
      });
   };

   useEffect(() =>{
    loadProducts();
   },[])

   return (
    <Layout title="Home Page" description="Node React Shopping Cart" className="container-fluid">
      <b style={{fontFamily:'fantasy',textAlign:'center',fontSize:'35px',backgroundColor:'grey',marginLeft:'500px'}}>Product Management</b>
       <div className="row">
          <div className="col-12">
             <h4 style={{color:'orange'}}>
                Total Products :{products.length}
             </h4>
             <table className="table table-striped">
                  {products.map((p,i) =>(
                      <tr key={i}>
                        <td>
                           <strong>{p.name}</strong>
                        </td>
                        <td>
                        <Link to={`/admin/product/update/${p._id}`}>
                              <span className="btn btn-info"><Icon width={20} icon={editIcon} /></span>
                           </Link>
                        </td>
                        <td>
                           <span onClick={() => destroy(p._id)} className="btn btn-danger"><Icon width={20} icon={baselineDelete} /></span>
                        </td>
                     </tr> 
                  ))}
             </table>
          </div>
       </div>    
    </Layout>
   ) 
}

export default ManageProducts;