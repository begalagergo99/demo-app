import { useState } from "react";
import { CreateTaskDto, Status } from "@demo-app/shared/models/Task";
import Input from "../../../../components/Input/Input";
import { statusOptions } from "../../../../utils/contants";
import { Select } from "../../../../components/Select/Select";
import { Button, ButtonStyle } from "../../../../components/Button/Button";

interface CreateTaskModalProps {
  onCreateNewTask: (task: CreateTaskDto) => void;
  onClose: () => void;
}

const CreateTaskModal = ({
  onCreateNewTask,
  onClose,
}: CreateTaskModalProps) => {
  const selectOptions = statusOptions.slice(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(selectOptions[0]);


  const handleSubmit = () => {
    const newTask: CreateTaskDto = {
      title,
      description,
      dueDate: new Date(dueDate),
      status: Status[selectedStatus.value as keyof typeof Status],
    };
    onCreateNewTask(newTask);
  };

  return (
    <div>
      <div className="py-5 my-5 flex flex-col gap-5" >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          items={selectOptions}
          selectedItem={selectedStatus}
          onSelectedItemChange={(item) => setSelectedStatus(item)}
        />
        <Input
          type="date"
          placeholder="Due Date:"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-5" >
        <Button type="button" label="Create" onClick={handleSubmit} />
        <Button type="button" style={ButtonStyle.SECONDARY} label="Cancel" onClick={onClose} />
      </div>
    </div>
  );
};

export default CreateTaskModal;
