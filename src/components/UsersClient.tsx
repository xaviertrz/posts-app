"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { User } from "@/app/types";
import { api } from "@/app/services/api";
import dynamic from "next/dynamic";

const Users = dynamic(() => import("@/components/Users"), { ssr: false });
const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false,
});

export default function UsersClient({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users,
    isPending,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: api.jsonplaceholder.fetchUsers,
    initialData: initialUsers,
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>Error al obtener los usuarios.</p>;

  // Filtrar usuarios por el término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Users users={filteredUsers} />
    </>
  );
}
