import { useState, useEffect } from "react";
import axios from "axios";
import { Container, List, ListItem } from "semantic-ui-react";
import type { Activity } from "../models/activity";
import NavBar from "./NavBar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>{activity.title}</ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
