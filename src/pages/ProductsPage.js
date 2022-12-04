import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState([]);

  useEffect(() => {
    fetchProductsAPI();
  }, []);

  const checkboxHandler = (state) => {
    setCheckboxStatus(state);
  };

  useEffect(() => {
    let productHolder = allProducts;
    if (checkboxStatus.mensclothing == false) {
      productHolder = productHolder.filter(
        (item) => item.category != "men's clothing"
      );
    }
    if (checkboxStatus.womensclothing == false) {
      productHolder = productHolder.filter(
        (item) => item.category != "women's clothing"
      );
    }
    if (checkboxStatus.electronics == false) {
      productHolder = productHolder.filter(
        (item) => item.category != "electronics"
      );
    }
    if (checkboxStatus.jewelery == false) {
      productHolder = productHolder.filter(
        (item) => item.category != "jewelery"
      );
    }
    setProducts(productHolder);
  }, [checkboxStatus]);

  const fetchProductsAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log(data);

      const products = data.map((productData) => {
        return {
          id: productData.id,
          title: productData.title,
          image: productData.image,
          description: productData.description,
          price: productData.price,
          rating: productData.rating.rate,
          ratingCount: productData.rating.count,
          category: productData.category,
        };
      });

      console.log("APIsta:");
      console.log(products);
      setProducts(products);
      setAllProducts(products);

      let isEmpty = await checkDatabaseEmpty();
      console.log(isEmpty);
      if (isEmpty) {
        productsToDB(products);
      }
    } catch (error) {
      const data = await fetchProductsDB();
      if (data === null) {
        setError(error.message);
      }

      let fetchedData = [];
      for (const key in data) {
        fetchedData = data[key];
      }
      console.log("Databasesta:");
      console.log(fetchedData);
      setProducts(fetchedData);
      setAllProducts(fetchedData);
    }
    setLoading(false);
  };

  const selectedProductsToDB = async (id, amount) => {
    console.log(id);
    const selectedProduct = {
      product_id: id,
      quantity: amount,
    };
    const response = await fetch(
      "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/selectedproducts.json",
      {
        method: "POST",
        body: JSON.stringify(selectedProduct),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const checkDatabaseEmpty = async () => {
    const response = await fetch(
      "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/allproducts.json"
    );
    const data = await response.json();
    if (data === null) {
      return true;
    } else {
      return false;
    }
  };

  const fetchProductsDB = async () => {
    const response = await fetch(
      "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/allproducts.json"
    );
    const data = await response.json();
    return data;
  };

  const productsToDB = async (products) => {
    const response = await fetch(
      "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/allproducts.json",
      {
        method: "POST",
        body: JSON.stringify(products),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  let content;

  if (error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <ProductList
        products={products}
        selectedProductsToDB={selectedProductsToDB}
      />
    );
  }

  return (
    <div>
      <Categories onCheckboxHandler={checkboxHandler} />
      <section>{content}</section>
    </div>
  );
};

export default ProductsPage;
