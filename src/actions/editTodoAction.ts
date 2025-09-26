"use server";

import { todoData } from "@/data";
import { revalidatePath } from "next/cache";

export async function editTodoAction(
  prev,
  formData: FormData
): Promise<{ message: string; sucess: boolean }> {
  const update = {
    name: formData.get("name")!.toString(),
    id: Number(formData.get("id"))!,
  };
  let prevName = "";

  todoData.map((item, i) => {
    if (item.id === update.id) {
      prevName = item.name;
      todoData[i] = update;
      return update;
    }

    return item;
  });
  
  revalidatePath("/[...id]");
  if (!prevName)
    return {
      message: `Não foi possível atualizar o todo`,
      sucess: false,
    };

  return {
    message: `todo ${prevName} atualizado para ${update.name}`,
    sucess: true,
  };
}
