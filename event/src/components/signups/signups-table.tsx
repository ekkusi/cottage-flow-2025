"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const stayDurationLabels: Record<string, string> = {
  "fri-sun": "Pe-su",
  "fri-sat": "Pe-la",
  "sat-sun": "La-su",
  "only-fri": "Vain pe",
  "only-sat": "Vain la",
};

type SignupsTableProps = {
  initialSignups: Preloaded<typeof api.signups.list>;
};

export function SignupsTable({ initialSignups }: SignupsTableProps) {
  // Use the initial data but also subscribe to live updates
  const liveSignups = usePreloadedQuery(initialSignups);

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nimi</TableHead>
            <TableHead>Aika</TableHead>
            <TableHead>Ruokavalio</TableHead>
            <TableHead>Lisätiedot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {liveSignups.map((signup) => (
            <TableRow key={signup._id}>
              <TableCell className="font-medium">{signup.name}</TableCell>
              <TableCell>{stayDurationLabels[signup.stayDuration]}</TableCell>
              <TableCell>{signup.diet}</TableCell>
              <TableCell className="max-w-xs truncate">
                {signup.additionalInfo}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

