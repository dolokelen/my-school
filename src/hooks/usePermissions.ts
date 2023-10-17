import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PERMISSION } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";

interface Permission {
  id: number;
  name: string;
}

const apiClients = apiClient<Permission>("/core/permissions/");

export const usePermissions = () => {
  return useQuery<Permission[], Error>({
    queryKey: [CACHE_KEY_PERMISSION],
    queryFn: apiClients.getAll,
    staleTime: 24 * 60 * 60 * 1000, //24hrs
  });
};

