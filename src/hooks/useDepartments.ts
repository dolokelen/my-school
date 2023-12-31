import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/httpService";
import ms from "ms";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_DEPARTMENT,
  DEPARTMENTS_ROUTE,
} from "../cacheKeysAndRoutes";
import { DepartmentCreateFormData } from "../pages/departments/DepartmentCreateForm";
import { DepartmentEditFormData } from "../pages/departments/DepartmentEditFrom";
import { useNavigate } from "react-router-dom";
import { DepartmentAddressEditFormData } from "../pages/departments/DepartmentAddressEditForm";
import { DepartmentContactEditFormData } from "../pages/departments/DepartmentContactEditForm";
import { useDepartmentContactStore } from "../pages/departments/departmentStore";
import { SimpleCourse } from "./useCourses";

export interface DepartmentAddress {
  country: string;
  county: string;
  district: string;
  city: string;
  community: string;
}

export interface DepartmentContact {
  id: number;
  phone: string;
  email: string;
}

export interface Department {
  id: number;
  name: string;
  budget: number;
  duty: string;
  number_of_courses: number;
  created_at: string;
  courses: SimpleCourse[];
  majors: number[];
  departmentaddress: DepartmentAddress;
  departmentcontact: DepartmentContact[];
}

const DEPARTMENT_URL = "/school/departments/";
const apiClients = apiClient<Department>(DEPARTMENT_URL);

export const useDepartments = () => {
  return useQuery<Department[], Error>({
    queryKey: [CACHE_KEY_DEPARTMENT],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useDepartment = (departmentPk: number) => {
  return useQuery<Department, Error>({
    queryKey: [CACHE_KEY_DEPARTMENT, departmentPk],
    queryFn: () => apiClients.get(departmentPk),
  });
};

export const useCreateDepartment = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<DepartmentCreateFormData>(DEPARTMENT_URL);

  const queryClient = useQueryClient();
  return useMutation<DepartmentCreateFormData, Error, DepartmentCreateFormData>(
    {
      mutationFn: (data: DepartmentCreateFormData) => apiClients.post(data),

      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_DEPARTMENT],
        });
      },
    }
  );
};

export const useEditDepartment = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<DepartmentEditFormData, Error, DepartmentEditFormData>({
    mutationFn: (data: DepartmentEditFormData) =>
      apiClients.patch<DepartmentEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_DEPARTMENT],
      });
    },
  });
};

export const useEditDepartmentAddress = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    DepartmentAddressEditFormData,
    Error,
    DepartmentAddressEditFormData
  >({
    mutationFn: (data: DepartmentAddressEditFormData) =>
      apiClients.patchNested<DepartmentAddressEditFormData>(
        data,
        "address",
        data.id
      ),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_DEPARTMENT],
      });
    },
  });
};

export const useEditDepartmentContact = (onUpdate: () => void, deptContactId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DepartmentContactEditFormData,
    Error,
    DepartmentContactEditFormData
  >({
    mutationFn: (data: DepartmentContactEditFormData) =>
      apiClients.patchNested<DepartmentContactEditFormData>(
        data,
        "contacts",
        deptContactId
      ),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_DEPARTMENT],
      });
    },
  });
};

export const useDeleteDepartment = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${DEPARTMENTS_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_DEPARTMENT],
      });
    },
  });
};
