"use client";

import { editTodoAction } from "@/actions/editTodoAction";
import { useActionState, useEffect, useState } from "react";

export function EditTodo(todo: { name: string; id: number }) {
  const [state, action, isPending] = useActionState(editTodoAction, null);
  const [message, setMessage] = useState<{
    message: string;
    sucess: boolean;
  } | null>();
  useEffect(() => {
    if (!state) return;
    setMessage(state);
    const timeOut = setTimeout(() => setMessage(null), 1000);

    return () => clearTimeout(timeOut);
  }, [state]);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={todo.id} />
      <input type="text" defaultValue={todo.name} name="name" />
      <button>{isPending ? "...carregando" : "Salvar"}</button>
      <p className={message?.sucess ? "text-green-500" : "text-red-500"}>
        {message?.message}
      </p>
    </form>
  );
}
