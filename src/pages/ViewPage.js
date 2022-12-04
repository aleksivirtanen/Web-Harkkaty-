import { useState, useEffect } from "react";
import AssignmentList from "../components/AssignmentList";

const ViewPage = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    const response = await fetch(
      "https://assignmentlist-fbf05-default-rtdb.europe-west1.firebasedatabase.app/assignmentlist.json"
    );
    const data = await response.json();

    const fetchedAssignments = [];

    for (const key in data) {
      fetchedAssignments.push({
        id: key,
        assignment: data[key].assignment,
        date: data[key].date,
      });
    }

    setAssignments(fetchedAssignments);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <AssignmentList assignments={assignments} />
    </div>
  );
};

export default ViewPage;
