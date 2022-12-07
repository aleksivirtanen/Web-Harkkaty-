import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

const ProductsPage = (props) => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [checkboxStatus, setCheckboxStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageToModal, setImageToModal] = useState();
  const [descrToModal, setDescrToModal] = useState();

  // Tuotetietojen haku APIsta sivun ensimmäisellä lataus kerralla.
  useEffect(() => {
    fetchProductsAPI();
  }, []);

  // Categories komponenttiin välitetty handleri, päivittää checkboxien tilaa käsittelevän staten parametrina saadun
  // taulukon mukaan.
  const checkboxHandler = (state) => {
    setCheckboxStatus(state);
  };

  // Handleri Modalin piilottamiseksi, annetaan propsina Backdrop komponenttiin
  const cancelModalHandler = () => {
    setShowModal(false);
  };

  // Handleri, joka annetaan propsina Product komponentille. Paluuarvoina klikatun tuotekuvan URL ja tarkempi kuvaus tuotteesta.
  // Asettaa myös Modal staten true -> tuo sen esille.
  const imageClickHandler = (image, description) => {
    setImageToModal(image);
    setDescrToModal(description);
    setShowModal(true);
  };

  // Hookki, jonka koodi suoritetaan silloin, kun checkboxien tilaa käsittelevä state muuttuu. Karsii eri kategorioita
  // käsittelevien checkboxien tilojen perusteella tuotelistasta tuotteita pois.
  useEffect(() => {
    let productHolder = allProducts;
    if (checkboxStatus.mensclothing === false) {
      productHolder = productHolder.filter(
        (item) => item.category !== "men's clothing"
      );
    }
    if (checkboxStatus.womensclothing === false) {
      productHolder = productHolder.filter(
        (item) => item.category !== "women's clothing"
      );
    }
    if (checkboxStatus.electronics === false) {
      productHolder = productHolder.filter(
        (item) => item.category !== "electronics"
      );
    }
    if (checkboxStatus.jewelery === false) {
      productHolder = productHolder.filter(
        (item) => item.category !== "jewelery"
      );
    }
    setProducts(productHolder);
  }, [checkboxStatus]);

  // Hakee tuotetiedot APIsta ja muotoilee datan haluttuun muotoon. Vie tuotetiedot tietokantaan talteen, mikäli
  // niitä säilövä taulu on tyhjä. Jos API-kutsu epäonnistuu, niin hakee tuotetiedot tietokannasta.
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

      // Onko tietokantataulu tyhjä, jos on vie tuotetiedot sinne talteen.
      let isEmpty = await checkDatabaseEmpty();
      console.log(isEmpty);
      if (isEmpty) {
        productsToDB(products);
      }
    } catch (error) {
      // Tuotteiden haku tietokannasta API-kutsun epäonnistuessa.
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

  // Valitun tuotteen tietojen vienti tietokantaan. Funktio välitetään propsina Product komponenttiin.
  const selectedProductsToDB = async (selectedProduct) => {
    console.log(selectedProduct);
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
    // App.js komponentista tuotu handleri ostoskorissa olevien tuotteiden määrän seuraamiseksi.
    props.quantityHandler(selectedProduct.quantity);
  };

  // Tarkistaa onko koko tuotelistaa säilövä tietokantataulu tyhjä.
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

  // Hakee koko tuotelistan tietokannasta.
  const fetchProductsDB = async () => {
    const response = await fetch(
      "https://webstore-b2c37-default-rtdb.europe-west1.firebasedatabase.app/allproducts.json"
    );
    const data = await response.json();
    return data;
  };

  // Vie koko tuotelistan tietokantaan.
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

  // Sivulla näkyvä sisältö tilanteesta riippuen joko error-viesti, loading tai tuotelista.
  if (error) {
    content = <h3>{error}</h3>;
  } else if (isLoading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <ProductList
        products={products}
        selectedProductsToDB={selectedProductsToDB}
        imageClickHandler={imageClickHandler}
      />
    );
  }

  return (
    <div>
      <Categories onCheckboxHandler={checkboxHandler} />
      <section>{content}</section>
      {showModal && <Modal image={imageToModal} description={descrToModal} />}
      {showModal ? <Backdrop onClick={cancelModalHandler} /> : null}
    </div>
  );
};

export default ProductsPage;
