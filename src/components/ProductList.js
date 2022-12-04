import Product from "./Product";

const ProductList = (props) => {
  return (
    <ul>
      {props.products.map((product) => (
        <Product
          id={product.id}
          title={product.title}
          image={product.image}
          description={product.description}
          rating={product.rating}
          ratingCount={product.ratingCount}
          price={product.price}
          selectedProductsToDB={props.selectedProductsToDB}
        />
      ))}
    </ul>
  );
};

export default ProductList;
