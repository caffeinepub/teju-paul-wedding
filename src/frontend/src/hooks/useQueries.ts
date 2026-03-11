import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AttendanceStatus } from "../backend.d";
import { useActor } from "./useActor";

export interface RsvpInput {
  name: string;
  email: string;
  status: AttendanceStatus;
  message: string;
}

export function useSubmitRsvp() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RsvpInput) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitRsvp(
        input.name,
        input.email,
        input.status,
        input.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
    },
  });
}
