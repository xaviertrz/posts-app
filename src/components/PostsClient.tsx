"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Post } from "@/app/types";
import { api } from "@/app/services/api";

import dynamic from "next/dynamic";

// Carga los componentes solo cuando se necesiten
const Posts = dynamic(() => import("@/components/Posts"), { ssr: false });
const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  ssr: false,
});

export default function PostsClient({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: posts,
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => api.jsonplaceholder.fetchPosts(page),
    initialData: page === 1 ? initialPosts : undefined,
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>Error al obtener las publicaciones.</p>;

  // Filtrar publicaciones por el término de búsqueda
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} />
      ) : (
        <p>No se encontraron publicaciones.</p>
      )}

      <Pagination className="mt-6 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"outline"}
              className="hover:cursor-pointer"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button variant="outline" disabled>
              Página {page}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              className="hover:cursor-pointer"
              variant={"outline"}
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!filteredPosts || filteredPosts.length < 5}
            >
              Siguiente
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
