"use server";
import { revalidatePath } from "next/cache";

export async function deleteTodoAction(
  prev,
  formData: FormData
): Promise<{
  message: string;
  sucess: boolean;
}> {
  console.log("deleting");
  const id = formData.get("id")?.toString();
  if (!id) return { message: "Erro", sucess: false };
  revalidatePath("/");
  return { message: "sucesso", sucess: true };
}
