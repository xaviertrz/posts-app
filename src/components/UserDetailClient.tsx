"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/services/api";
import { User } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function UserDetailClient({
  initialUser,
}: {
  initialUser: User;
}) {
  const userId = initialUser.id;

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.jsonplaceholder.fetchUser(userId.toString()),
    initialData: initialUser,
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>Error al obtener el usuario.</p>;
  if (!user) return <p>Usuario no encontrado.</p>;

  return (
    <main>
      <div className="mb-6">
        <Link href="/users">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Volver a la lista
          </Button>
        </Link>
      </div>

      <Card className="max-w-3xl mx-auto hover:bg-inherit">
        <CardHeader>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <p className="text-gray-500">@{user.username}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Información de contacto</h3>

              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-500" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} className="text-blue-500" />
                <span>{user.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe size={18} className="text-blue-500" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">Empresa</h3>

              <div className="flex items-center gap-2">
                <Building size={18} className="text-blue-500" />
                <span>{user.company.name}</span>
              </div>

              <p className="pl-6 text-gray-600 italic">
                {user.company.catchPhrase}
              </p>
              <p className="pl-6 text-gray-600">BS: {user.company.bs}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium text-lg mb-3">Dirección</h3>

            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-blue-500 mt-1" />
              <address className="not-italic">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </address>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
