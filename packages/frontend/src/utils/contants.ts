import { Status } from "@demo-app/shared/models/Task";

export const statusOptions = [
  { title: "All", value: ""},
  { title: "Active", value: Status.ACTIVE },
  { title: "Inprogress", value: Status.IN_PROGRESS },
  { title: "Done", value: Status.DONE },
  { title: "Inactive", value: Status.INACTIVE },
];