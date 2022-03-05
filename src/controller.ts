import path from "path";

import { Task } from "./ITask";
import { Response } from "./IResponse";
import { Request } from "./IRequest";
import { readFile, writeFile } from "./filereader";

const getTasks = async (req: Request<Task>, res: Response) => {
  try {
    const data = await readFile(path.join(__dirname, "store.json"), "utf8");

    res.json(200, {
      success: true,
      message: data,
    });
  } catch (err) {
    res.json(500, {
      success: false,
      error: err,
    });
  }
};

const lerEAlterarArquivo = async (
  task: Task,
  callback: Function,
  res: Response
) => {
  try {
    //@ts-ignore
    const tasks: [Task] = await readFile(
      path.join(__dirname, "store.json"),
      "utf8"
    );

    callback(tasks);

    await writeFile(path.join(__dirname, "store.json"), tasks);

    res.json(200, {
      success: true,
      message: task,
    });
  } catch (err) {
    res.json(500, {
      success: false,
      error: err,
    });
  }
};

const addTask = async (req: Request<Task>, res: Response) => {
  let task = req.body;

  lerEAlterarArquivo(
    task,
    (tasks: Task[]) => {
      let latest_id = tasks.reduce(
        (max = 0, task: Task) => (task.id > max ? task.id : max),
        0
      );
      task.id = latest_id + 1;
      tasks.push(task);
    },
    res
  );
};

const updateTask = async (req: Request<Task>, res: Response) => {
  let task: Task = req.body;
  lerEAlterarArquivo(
    task,
    (tasks: Task[]) => {
      let index = tasks.findIndex((t) => t.id == task.id);
      tasks[index] = task;
    },
    res
  );
};

const deleteTask = async (req: Request<Task>, res: Response) => {
  let task: Task = req.body;
  lerEAlterarArquivo(
    task,
    (tasks: Task[]) => {
      let index = tasks.findIndex((t) => t.id == task.id);
      tasks.splice(index, 1);
    },
    res
  );
};

export { getTasks, addTask, updateTask, deleteTask };
