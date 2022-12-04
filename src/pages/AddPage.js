import { useHistory } from "react-router-dom";

const AddPage = () => {
  const history = useHistory();

  history.push("/");

  return <div>Kesken</div>;
};

export default AddPage;
