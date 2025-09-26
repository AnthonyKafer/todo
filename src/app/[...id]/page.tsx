import { todoData } from "@/data";
import { EditTodo } from "./_components/editForm";
import { OtherTodos } from "./_components/otherTodos";
import { Suspense } from "react";

export async function getTodo(id: string) {
  const idNumber = Number(id);
  return todoData.find((todo) => todo.id === idNumber);
}

export default async function TodoDetails({
  params,
}: {
  params: { id: string };
}) {
  const todo = await getTodo(params.id);
  if (!todo) return <div>O item procurado nao existe</div>;

  return (
    <div>
      <Suspense fallback={<div>...carregando</div>}>
        <EditTodo {...todo} />
      </Suspense>
      <Suspense fallback={<div>...carregando</div>}>
        <OtherTodos id={todo.id} />
      </Suspense>
    </div>
  );
}
