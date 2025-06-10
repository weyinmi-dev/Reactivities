import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import type { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        const activities: Activity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          activities.push(activity);
        });
        setActivities(response);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  function handledSelectedActivity(id: string) {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    if (id) {
      handledSelectedActivity(id);
    } else {
      handleCancelSelectedActivity();
    }
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivty(activity: Activity) {
    if (activity.id) {
      setActivities([
        ...activities.filter((x) => x.id !== activity.id),
        activity,
      ]);
    } else {
      setActivities([...activities, { ...activity, id: uuid() }]);
    }
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handledSelectedActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivty}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
