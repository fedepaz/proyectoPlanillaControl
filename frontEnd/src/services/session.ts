import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const sessionUrl = "http://localhost:5555/session/";

interface SessionResponse {
  dni?: string;
}

export function useSession(): UseQueryResult<SessionResponse, Error> {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await axios.get<SessionResponse>(sessionUrl, {
        withCredentials: true,
      });
      if (res.data === null) {
        return res.data;
      } else {
        return res.data;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
}
