"use client";
import { createTodoAction } from "@/actions/createTodoAction";
import { cn } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";

export function CreateForm() {
  const [state, action, isPending] = useActionState(createTodoAction, null);

  const [message, setMessage] = useState<{
    message: string;
    sucess: boolean;
  } | null>(
    {} as {
      message: "";
      sucess: false;
    }
  );

  useEffect(() => {
    if (!state) return;
    setMessage(state);
    const timeOutMessage = setTimeout(() => {
      setMessage(null);
    }, 2000);
    return () => clearTimeout(timeOutMessage);
  }, [state]);

  return (
    <form action={action} className="flex flex-col bg-blue-200">
      <input type="text" name="name" id="name" className="bg-gray-400" />
      <button type="submit">{isPending ? "..carregando" : "Criar"}</button>

      {!!message && (
        <div
          className={cn("mt-2", message.sucess ? "bg-green-500" : "bg-red-500")}
        >
          {message.message}
        </div>
      )}
    </form>
  );
}
