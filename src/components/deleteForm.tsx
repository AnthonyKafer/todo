"use client";
import { deleteTodoAction } from "@/actions/deleteTodoAction";
import { cn } from "@/lib/utils";
import { Suspense, useActionState, useEffect, useState } from "react";

export function DeleteForm(item: { name: string; id: number }) {
  const [state, action, isPending] = useActionState(deleteTodoAction, null);
  const [message, setMessage] = useState<{
    message: string;
    sucess: boolean;
  } | null>();
  useEffect(() => {
    if (!state) return;
    setMessage(state);
    const timeOut = setTimeout(() => setMessage(null), 2000);

    return () => clearTimeout(timeOut);
  }, [state]);

  return (
    <form action={action} key={item.id} className="flex bg-gray-500 gap-1">
      <Suspense fallback={<div>...carregando</div>}>
        {item.name}
        <input type="hidden" name="id" value={item.id} />
        <button type="submit">{isPending ? "...carregando" : "Deletar"}</button>
        {!!message && (
          <div
            className={cn(
              "mt-1",
              message.sucess ? "bg-green-500" : "bg-red-500"
            )}
          >
            {message.message}
          </div>
        )}
      </Suspense>
    </form>
  );
}
