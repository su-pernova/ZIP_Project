import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function ProductCards({title, data}) {

  return (
    <div className='cards'>
      <h1>{title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {!data? <></>:
            ( 
              data.map(product=>(
                <CardItem
                key={product.id}
                id={product.id}
                src={product.image}
                text= {product.title}
                label={product.type}
                user={product.user}
                path= {`/product-detail/${product.id}`}
              />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductCards;
