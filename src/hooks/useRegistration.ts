import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegistrationFormData } from "../accounts/RegistrationPage";
import { CACHE_KEY_REGISTER } from "../data/constants";
import apiClient from "../services/httpService";

const apiClients = apiClient<RegistrationFormData>("auth/users/");

export const useRegistration = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<RegistrationFormData, Error, RegistrationFormData>({
    mutationFn: (data: RegistrationFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_REGISTER],
      });
    },
  });
};
