import { useEffect, useState } from "react";
import { AuthService } from "../../../services/AuthService";
import { useRecoilState } from "recoil";
import { userState } from "../../../context/user.atom";
import Header from "../components/Header/Header";
import SearchBar, {
  SearchBarChangeEvent,
} from "../components/SearchBar/SearchBar";
import { BaseModal } from "../../../components/Modals/BaseModal";
import { useNavigate } from "react-router-dom";
import { routing } from "../../../routing";
import { statusOptions } from "../../../utils/contants";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import { CreateTaskDto, TaskDto } from "@demo-app/shared/models/Task";
import { TaskService } from "../../../services/interceptor/TaskService";
import TaskRow from "../components/TaskRow/TaskRow";
import ListHeader from "../components/ListHeader/ListHeader";

export const Dashboard = () => {
  const [user, setUser] = useRecoilState(userState);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskDto[]>([]);

  const tokenValidation = async () => {
    try {
      const response = await AuthService.tokenValidation();
      setUser(response.user);
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("AuthToken");
      navigate(routing.login);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getTasks();
      setTasks(response);
      setFilteredTasks(response);
    } catch (error) {
      console.error(error);
    }
  }

  const onFiltersChange = (filters: SearchBarChangeEvent) => {
    if(!filters.searchText && !filters.status) return setFilteredTasks(tasks);
    const filteredTasks = tasks.filter((task) => {
      console.log(task);
      return task.title.toLowerCase().includes(filters.searchText.toLowerCase()) && (!filters.status || task.status === filters.status)

    });
    setFilteredTasks(filteredTasks);
  };

  const onCreateNewTask = async (task: CreateTaskDto) => {
    try {
      await TaskService.createTask(task);
    } catch (error) {
      console.error(error);
    } finally {
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    tokenValidation();
    fetchTasks();
  }, []);

  return (
    <div>
      {user && <Header userName={user.name} />}
      {error && <p>{error}</p>}
      <div className="flex justify-center my-10">
        <SearchBar
          selectableOptions={statusOptions}
          onFiltersChange={onFiltersChange}
          onCreateNewItem={() => setModalIsOpen(true)}
        />
      </div>
      <div>
        <ListHeader />
       {
          filteredTasks.map((task) => (
            <TaskRow task={task} key={task.id} />
          ))
       }
      </div>
        <BaseModal
          isOpen={modalIsOpen}
          setIsOpen={(isOpen) => setModalIsOpen(isOpen)}
        >
          <CreateTaskModal
            onCreateNewTask={onCreateNewTask}
            onClose={() => setModalIsOpen(false)}
          />
        </BaseModal>
    </div>
  );
};
