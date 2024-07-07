// script.js

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASf-6QO0uG3P6VoABwCz63iiBMB_ImVk0",
  authDomain: "todolist-9fe43.firebaseapp.com",
  projectId: "todolist-9fe43",
  storageBucket: "todolist-9fe43.appspot.com",
  messagingSenderId: "463706579138",
  appId: "1:463706579138:web:3e990d47c300b949c19b5b",
  measurementId: "G-YC4FQ8T0J4",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const form = document.getElementById("myForm");
const taskContainer = document.getElementById("taskContainer");

// Create a task
function createTask(taskName) {
  db.collection("tasks")
    .add({
      name: taskName,
      completed: false,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      fetchTasks(); // Refresh the task list after adding a new task
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

// Read tasks
function fetchTasks() {
  db.collection("tasks")
    .get()
    .then((querySnapshot) => {
      taskContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute("data-id", doc.id);
        console.log(task.completed);
        taskDiv.innerHTML = `
               <input name="completed" type="checkbox" class="completed" ${
                 task.completed ? "checked" : ""
               } id=${doc.id} />
              <span>${task.name}</span>
              <div>
                  <button onclick="updateTask('${doc.id}', '${
          task.name
        }')">Edit</button>
                  <button onclick="deleteTask('${doc.id}')">Delete</button>
              </div>
            `;
        taskContainer.appendChild(taskDiv);

        const checkboxElements = document.querySelectorAll(".completed");

        // Add an event listener to each element
        checkboxElements.forEach((element) => {
          element.addEventListener("change", (event) => {
            console.log("heeree");
            const value = event.target.checked;
            const id = event.target.id;

            updateTaskCompleted(id, value);
          });
        });
      });
      
    })
    .catch((error) => {
      console.error("Error fetching tasks: ", error);
    });
}

// Update a task
function updateTask(id, oldName) {
  const newTaskName = prompt("Enter the new task name:", oldName);
  if (newTaskName) {
    db.collection("tasks")
      .doc(id)
      .update({
        name: newTaskName,
      })
      .then(() => {
        console.log("Document successfully updated!");
        fetchTasks(); // Refresh the task list after updating
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }
}

function updateTaskCompleted(id, completed) {
  db.collection("tasks")
    .doc(id)
    .update({
      completed: completed,
    })
    .then(() => {
      fetchTasks(); // Refresh the task list after updating
    });
}

// Delete a task
function deleteTask(id) {
  db.collection("tasks")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      fetchTasks(); // Refresh the task list after deleting
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
}

// Add task event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = form.name.value;
  const completed = form.completed.value;

  console.log({ taskName, completed });
  // createTask(taskName);
  // form.reset();
});

// Fetch tasks on initial load
fetchTasks();

// // Create;

// db.collection('tasks')
//   .add({
//     name: 'Alaa',
//     completed: true,
//   })
//   .then((docRef) => {
//     console.log('Document written with ID: ', docRef.id);
//   })
//   .catch((error) => {
//     console.error('Error adding document: ', error);
//   });

// // Read;

// db.collection('tasks')
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       const item = doc.data();
//       console.log(item, doc.id);
//     });
//   });

// // Update;

// db.collection('tasks')
//   .doc('hcbB1S1YJ3YqF1mfIkGN')
//   .update({
//     name: 'qais updated',
//   })
//   .then(() => {
//     console.log('Document successfully updated!');
//   })
//   .catch((error) => {
//     console.error('Error updating document: ', error);
//   });

// // Delete

// db.collection('tasks')
//   .doc('hcbB1S1YJ3YqF1mfIkGN')
//   .delete()
//   .then(() => {
//     console.log('Document successfully deleted!');
//   })
//   .catch((error) => {
//     console.error('Error deleting document: ', error);
//   });
