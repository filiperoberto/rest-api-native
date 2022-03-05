import http from 'http';
import { getTasks, addTask, updateTask, deleteTask } from "./controller";

const port = 3000;

import { router, get, post, del, put } from './routes';

const myServer = http.createServer(router);

get("/api/tasks", getTasks);
post("/api/tasks", addTask);
put("/api/tasks", updateTask);
del("/api/tasks", deleteTask);

myServer.listen(port, () => {
  console.log(
    `Server is running on port ${port}. Go to http://localhost:${port}/`
  );
});

//myServer.close();