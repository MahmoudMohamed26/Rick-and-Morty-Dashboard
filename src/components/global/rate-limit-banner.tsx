"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RateLimitBanner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-10 text-center">
      <AlertTriangle className="h-10 w-10 text-amber-500" />
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-amber-700">
          Slow down there!
        </h2>
        <p className="text-sm text-muted-foreground">
          The Rick and Morty API is rate-limiting requests. Please wait a moment
          and try again.
        </p>
      </div>
      <Button
        variant="outline"
        className="border-amber-500/30 text-amber-700 hover:bg-amber-500/10"
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </div>
  );
}
