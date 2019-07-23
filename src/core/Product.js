import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import ProductDetails from "./ProductDetails";
import ShowImage from "./ShowImage";
// import { Link } from 'react-router-dom';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        //fetch related products only after product loads (need id)
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  // const goBack = () => (
  //   <div className="mt-5">
  //     <Link to="/admin/dashboard">
  //       go back to dashboard
  //     </Link>
  //   </div>
  // );

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description.substring(0, 100)}
      className="container"
  >
    {/* {goBack()} */}
    <div className="row no-gutters">
        <div className="col-8">
          <div className="details-img">
            <ShowImage item={product} url="product" />
          </div>
        </div>

        <div className="col-4">
            {product && product.description && ( 
            <ProductDetails product={product} showViewProductButton={false} />
            )}
        </div>

        
        <div className="related">
        <h2 className="mb-3">RECOMMENDED</h2>
          <div className="row">
            {relatedProduct.map((p, i) => (
              <div className="col-3">
                <Card key={i} product={p} />
              </div>
            )).splice(0,4)}
          </div>
        </div>
        <br /><br />
    </div>


    </Layout>
  );
};

export default (Product);


// return (
//   <Layout
//     title={product && product.name}
//     description={product && product.description && product.description.substring(0, 100)}
//     className="container"
// >
//     <div className="row">
//       <div className="col-8">
//         {product && product.description && ( 
//         <Card product={product} showViewProductButton={false} />
//         )}
//       </div>

//       <div className="col-4">
//         <h4>other recommended items</h4>
//           {relatedProduct.map((p, i) => (
//             <div className="mb-3">
//               <Card key={i} product={p} />
//             </div>
//           ))}
//       </div>

//     </div>
//   </Layout>
// );

// {product.description.substring(0, 100)}...