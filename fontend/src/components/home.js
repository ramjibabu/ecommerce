import React, { Fragment, useEffect,useState } from 'react';
import { getProducts } from '../actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loder';
import ProductSort from './productSort';
import { toast } from 'react-toastify';
import Pagination from 'react-responsive-pagination';








export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  console.log(currentPage)
const setCurrentPageNo=(pageNo)=>{
setCurrentPage(pageNo)
}



  const dispatch = useDispatch()
  const { products, loading, error,productsCount ,resultPerPage} = useSelector((state) => state.productsState)

  const jjk=Math.round(productsCount / 2)
  console.log(jjk)
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
   
    dispatch(getProducts)
    console.log('ff',products)
  }, [error,dispatch])

  return (
    <Fragment>
      {!loading ? <Fragment>

        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
          <div className="row">
            {products && products.map(product => (
              <ProductSort key={product._id} product={product} />
            ))}


          </div>
        </section>
      {productsCount > 0 && productsCount > resultPerPage?  <div className='d-flex justify-content-center mt-5'>
        <Pagination
        
        current={currentPage}
        total={jjk}
    
        onPageChange={setCurrentPageNo}
        
        
        

         
          />
        </div>:null}
       
         
         
        

      </Fragment> : <Loader />}


    </Fragment>
  )
}