import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import { useState } from "react";

const Categories = (props) => {
  const [state, setState] = useState({
    mensclothing: true,
    womensclothing: true,
    electronics: true,
    jewelery: true,
  });

  const handleChange = (event) => {
    let currentState = {
      ...state,
      [event.target.name]: event.target.checked,
    };
    setState(currentState);
    props.onCheckboxHandler(currentState);
  };

  const { mensclothing, womensclothing, electronics, jewelery } = state;

  return (
    <FormGroup>
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
            checked={electronics}
            onChange={handleChange}
            name="electronics"
          />
        }
        label="Electronics"
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
    </FormGroup>
  );
};

export default Categories;
