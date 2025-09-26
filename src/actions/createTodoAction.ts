"use server";

import { todoData } from "@/data";
import { revalidatePath } from "next/cache";

export async function createTodoAction(
  prev,
  formData: FormData
): Promise<{
  message: string;
  sucess: boolean;
}> {
  const nextId = todoData[todoData.length - 1]?.id + 1;
  const name = formData.get("name")?.toString();
  if (!name) return { message: "Criação falhou", sucess: false };
  todoData.push({ name, id: nextId });
  revalidatePath("/");
  return { message: `todo ${name} criado`, sucess: true };
}
