import { todoData } from "@/data";
import { CreateForm } from "../components/createForm";
import { DeleteForm } from "../components/deleteForm";

export async function getTodos() {
  const res = await new Promise((resolve) =>
    setTimeout(() => resolve(todoData), 2000)
  );
  console.log("resolving from server");
  return res as { id: number; name: string }[];
}

export default async function Home() {
  const res = await getTodos();
  console.log(res, "got from server");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CreateForm />
        <div className="flex">
          <ol className="flex flex-col bg-gray-500 gap-1">
            {res.map((item) => (
              <DeleteForm key={item.id} {...item} />
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
