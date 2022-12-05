import Product from "./Product";
import Grid from "@mui/material/Grid";

const ProductList = (props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {props.products.map((product, index) => (
        <Grid item xs={2} sm={4} md={3} key={index}>
          <Product
            id={product.id}
            title={product.title}
            image={product.image}
            description={product.description}
            rating={product.rating}
            ratingCount={product.ratingCount}
            price={product.price}
            selectedProductsToDB={props.selectedProductsToDB}
            imageClickHandler={props.imageClickHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
