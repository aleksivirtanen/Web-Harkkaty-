import AddAssignment from "../components/AddAssignment";
import { useHistory } from "react-router-dom";

const AddPage = () => {
  const history = useHistory();

  const addAssignmentHandler = async (assignment) => {
    const response = await fetch(
      "https://assignmentlist-fbf05-default-rtdb.europe-west1.firebasedatabase.app/assignmentlist.json",
      {
        method: "POST",
        body: JSON.stringify(assignment),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    history.push("/");
  };

  return (
    <div>
      <AddAssignment onAddAssignment={addAssignmentHandler} />
    </div>
  );
};

export default AddPage;
