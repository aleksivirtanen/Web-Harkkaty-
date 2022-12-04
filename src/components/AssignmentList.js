const AssignmentList = (props) => {
  return (
    <ul>
      {props.assignments.map((assignment) => (
        <div key={assignment.id}>
          <h3>{assignment.assignment}</h3>
          <h3>{assignment.date}</h3>
          <br></br>
        </div>
      ))}
    </ul>
  );
};

export default AssignmentList;
