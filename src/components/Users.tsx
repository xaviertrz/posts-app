import { User } from "@/app/types";
import Link from "next/link";
import { Mail, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

function Users({ users }: { users: User[] }) {
  return (
    <div className="grid grid-cols-3 gap-7">
      {users.map((user) => (
        <Link key={user.id} href={`/users/${user.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <UserRound size={15} />
                <span>{user.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} />
                <span>{user.email}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default Users;
