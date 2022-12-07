import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

const Categories = (props) => {
  // Lähtötilanteessa kaikki Checkboxit true
  const [state, setState] = useState({
    mensclothing: true,
    womensclothing: true,
    electronics: true,
    jewelery: true,
  });

  // Handleri, jonka koodi suoritetaan aina kun jonkin Checkboxin arvo muuttuu.
  // Päivitetään komponentissa tiloja käsittelevä state ja annetaan tämän hetkinen
  // Checkboxien tila propsina tuodulle handlerille.
  const handleChange = (event) => {
    let currentState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(currentState);
    props.onCheckboxHandler(currentState);
  };

  const { mensclothing, womensclothing, electronics, jewelery } = state;

  // Box/FormControl/FormGroup/FormControlLabel ovat kategoria alueen muotoilua ja asettelua varten.
  // Jokaista tuotekategoriaa kohden oma Checkbox komponentti.
  return (
    <Box border={15} borderColor="#585556" sx={{ display: "box" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={mensclothing}
                onChange={handleChange}
                name="mensclothing"
              />
            }
            label="Men's Clothing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={womensclothing}
                onChange={handleChange}
                name="womensclothing"
              />
            }
            label="Women's Clothing"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={jewelery}
                onChange={handleChange}
                name="jewelery"
              />
            }
            label="Jewelery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={electronics}
                onChange={handleChange}
                name="electronics"
              />
            }
            label="Electronics"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Categories;
