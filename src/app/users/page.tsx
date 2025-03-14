import { api } from "../services/api";
import UsersClient from "@/components/UsersClient";

export default async function UsersPage() {
  const users = await api.jsonplaceholder.fetchUsers();
  return (
    <section>
      <h2 className="font-bold text-xl mb-6">Usuarios</h2>
      <UsersClient initialUsers={users} />
    </section>
  );
}
