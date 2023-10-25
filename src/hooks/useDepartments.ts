import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/httpService";
import ms from "ms";
import { CACHE_KEY_DEPARTMENT } from "../cacheKeysAndRoutes";

interface Department {
    id?: number;
    name: string;
    budget: number;
    duty: string;
}

const apiClients = apiClient<Department>("/school/departments/");

export const useDepartment = () => {
  return useQuery<Department[], Error>({
    queryKey: [CACHE_KEY_DEPARTMENT],
    queryFn: apiClients.getAll,
    staleTime: ms('24h')
  });
}