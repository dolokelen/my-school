import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_OFFICE, OFFICES_ROUTE } from "../cacheKeysAndRoutes";
import { OfficeCreateFormData } from "../pages/offices/OfficeCreateForm";
import apiClient from "../services/httpService";
import { OfficeEditFormData } from "../pages/offices/OfficeEditForm";

export interface Office {
  id: number;
  dimension: string;
  building: {id: number, name: string};
}

const OFFICE_URL = "/school/offices/";
const apiClients = apiClient<Office>(OFFICE_URL);

export const useOffices = () => {
  return useQuery<Office[], Error>({
    queryKey: [CACHE_KEY_OFFICE],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useOffice = (officeId: number) => {

  return useQuery<Office, Error>({
    queryKey: [CACHE_KEY_OFFICE, officeId],
    queryFn: () => apiClients.get(officeId),
  });
};

export const useCreateOffice = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<OfficeCreateFormData>(OFFICE_URL);

  const queryClient = useQueryClient();
  return useMutation<OfficeCreateFormData, Error, OfficeCreateFormData>(
    {
      mutationFn: (data: OfficeCreateFormData) => apiClients.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_OFFICE],
        });
      },
    }
  );
};

export const useEditOffice = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<OfficeEditFormData, Error, OfficeEditFormData>({
    mutationFn: (data: OfficeEditFormData) =>
      apiClients.patch(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_OFFICE],
      });
    },
  });
};


export const useDeleteOffice = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${OFFICES_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_OFFICE],
      });
    },
  });
};
