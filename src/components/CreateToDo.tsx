import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}