import { useRef } from "react";

const AddAssignment = (props) => {
  const assignmentRef = useRef("");
  const dateRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const assignment = {
      assignment: assignmentRef.current.value,
      date: dateRef.current.value,
    };

    props.onAddAssignment(assignment);

    assignmentRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <br></br>
        <label htmlFor="assignment">Assignment: </label>
        <textarea rows="2" id="assignment" ref={assignmentRef}></textarea>
      </div>
      <div>
        <label htmlFor="date">Date: </label>
        <input type="date" id="date" ref={dateRef} />
      </div>

      <button>Add new assignment</button>
    </form>
  );
};

export default AddAssignment;
