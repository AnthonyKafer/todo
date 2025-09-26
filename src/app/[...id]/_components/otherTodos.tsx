"use client";
import { todoData } from "@/data";
import { use } from "react";

async function getOther(id: number) {
  const time = setTimeout(() => {}, 1000000000000);
  await time;
  return Promise.resolve(todoData.filter((item) => item.id !== id));
}

export function OtherTodos({ id }: { id: number }) {
  const others = use(getOther(id));

  return (
    <div className="mt-5">
      <h1>outros todos</h1>

      <ol>
        {others?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
    </div>
  );
}
