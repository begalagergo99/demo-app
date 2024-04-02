import { useEffect, useState } from "react";
import { AuthService } from "../../../services/AuthService";
import { useRecoilState } from "recoil";
import { userState } from "../../../context/user.atom";
import Header from "../components/Header/Header";
import SearchBar, { SearchBarChangeEvent } from "../components/SearchBar/SearchBar";
import { BaseModal } from "../../../components/Modals/BaseModal";
import { useNavigate } from "react-router-dom";
import { routing } from "../../../routing";
import { Status } from "@demo-app/shared/models/Task";

export const Dashboard = () => {
  const [user, setUser] = useRecoilState(userState);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const statusOptions = [
    { title: "All", value: ""},
    { title: "Active", value: Status.ACTIVE },
    { title: "Inprogress", value: Status.IN_PROGRESS },
    { title: "Done", value: Status.DONE },
    { title: "Inactive", value: Status.INACTIVE },
  ];

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

  const onFiltersChange = (filters: SearchBarChangeEvent) => {
    console.log(filters);
  }

  const onCreateNewTask = () => {
   setModalIsOpen(true);
  }

  useEffect(() => {
    tokenValidation();
  }, []);

  return (
    <div>
      {user && <Header userName={user.name} />}
      {error && <p>{error}</p>}
      <div className="flex justify-center my-10" >
        <SearchBar selectableOptions={statusOptions} onFiltersChange={onFiltersChange} onCreateNewItem={onCreateNewTask} />
        <BaseModal isOpen={modalIsOpen} setIsOpen={(isOpen) => setModalIsOpen(isOpen)} >
          <div>
            <h1>Modal content</h1>
          </div>
        </BaseModal>
      </div>
    </div>
  );
};
