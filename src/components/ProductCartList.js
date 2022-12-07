import ProductCart from "./ProductCart";

// Tuotteiden listaus ja propsit yksittäisille tuotteille.
const ProductCartList = (props) => {
  return (
    <ul>
      {props.products.map((product) => (
        <ProductCart
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          quantity={product.quantity}
          keyDB={product.keyDB}
          onRemoveProductDB={props.onRemoveProductDB}
        />
      ))}
    </ul>
  );
};

export default ProductCartList;
