import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle, Notepad } from "phosphor-react";

import { Header } from "./components/Header";
import { ListItem } from "./components/ListItem";
import { Counter } from "./components/Counter";

import styles from "./App.module.css";
import "./global.css";

interface Task {
  text: string;
  checked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks((prev) => [
      ...prev,
      {
        text: newTask,
        checked: false,
      },
    ]);
    setNewTask("");
  }

  function handleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Sem texto, sem envio.");
  }

  function deleteTask(task: string) {
    setTasks((prev) => prev.filter((oldTask) => oldTask.text !== task));
  }

  function onTaskCheckedChange(text: string, checked: boolean) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const taskToChange = task.text === text;
        return taskToChange
          ? {
              text: task.text,
              checked: checked,
            }
          : task;
      })
    );
  }

  const checkedTasks = tasks.filter((task) => task.checked === true).length;

  return (
    <div>
      <Header />
      <main className={styles.container}>
        <form className={styles.form} onSubmit={handleNewTask}>
          <input
            required
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleTaskChange}
            onInvalid={handleNewTaskInvalid}
            value={newTask}
          />
          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </form>

        <div className={styles.listHeader}>
          <span
            className={styles.listHeaderBlue}
            data-total-tasks={tasks.length}
          >
            Tarefas Criadas <Counter times={tasks.length} />
          </span>
          <span className={styles.listHeaderPurple}>
            Tarefas Concluidas
            <Counter
              times={
                tasks.length > 0
                  ? `${checkedTasks} de ${tasks.length}`
                  : tasks.length
              }
            />
          </span>
        </div>
        <div
          className={tasks.length === 0 ? styles.emptyBody : styles.listBody}
        >
          {tasks.length === 0 && (
            <>
              <Notepad size={48} />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie e organize seus itens a fazer</p>
            </>
          )}
          {tasks.map((task) => (
            <ListItem
              text={task.text}
              key={task.text}
              onDelete={deleteTask}
              onCheckedChange={onTaskCheckedChange}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
