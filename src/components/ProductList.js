import Product from "./Product";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Propsit yksittäisille tuotteille, niiden asettelu ruudukkoon näytön koon mukaan
// ja border ruudukon ympärille.
const ProductList = (props) => {
  return (
    <Box border={15} borderColor="#585556" sx={{ display: "box" }}>
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
    </Box>
  );
};

export default ProductList;
