const Dropdown = (props) => {
  let value;

  // Pudotusvalikon arvon muuttuessa se annetaan Product komponentista tuodulle
  // handlerille parametrina.
  const handleChange = (event) => {
    props.dropdownHandler(parseInt(event.target.value));
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option value="1" selected>
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
};

export default Dropdown;
