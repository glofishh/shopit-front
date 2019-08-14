import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import ProductDetails from "./ProductDetails";
import ShowImageProductDetails from "./ShowImageProductDetails";

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

  return (
    <Layout
      className="container"
  >
    <div className="row no-gutters">
        <div className="col-8">
          <div className="details-img">
            {product && product.description && (
            <ShowImageProductDetails item={product} url="product" />
            )}
          </div>
        </div>

        <div className="col-4">
            {product && product.description && ( 
            <ProductDetails product={product} />
            )}
        </div>

        
        <div className="related">
        <h2 className="mb-3 text-uppercase">Other items in similar category</h2>
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