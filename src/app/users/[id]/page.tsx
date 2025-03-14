import UserDetailClient from "@/components/UserDetailClient";
import { api } from "../../services/api";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await api.jsonplaceholder.fetchUser(params.id);

  return <UserDetailClient initialUser={user} />;
}
