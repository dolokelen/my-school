import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  BUILDINGS_ROUTE,
  CACHE_KEY_BUILDING,
} from "../cacheKeysAndRoutes";
import { BuildingAddressEditFormData } from "../pages/buildings/BuildingAddressEditForm";
import { BuildingCreateFormData } from "../pages/buildings/BuildingCreateForm";
import { BuildingEditFormData } from "../pages/buildings/BuildingEditForm";
import apiClient from "../services/httpService";
import { Address } from "./useAddress";

export interface BuildingClassroom {
  id: number;
  name: string;
  dimension: string;
}

export interface Building {
  id: number;
  name: string;
  dimension: string;
  office_counts: number;
  classroom_counts: number;
  toilet_counts: number;
  date_constructed: string;
  buildingaddress: Address;
  classrooms: BuildingClassroom[];
}

const BUILDING_URL = "/school/buildings/";
const apiClients = apiClient<Building>(BUILDING_URL);

export const useBuildings = () => {
  return useQuery<Building[], Error>({
    queryKey: [CACHE_KEY_BUILDING],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useBuilding = (buildingId: number) => {
  return useQuery<Building, Error>({
    queryKey: [CACHE_KEY_BUILDING, buildingId],
    queryFn: () => apiClients.get(buildingId),
  });
};

export const useCreateBuilding = (onCreate: () => void, reset: () => void) => {
  const apiClients = apiClient<BuildingCreateFormData>(BUILDING_URL);

  const queryClient = useQueryClient();
  return useMutation<BuildingCreateFormData, Error, BuildingCreateFormData>({
    mutationFn: (data: BuildingCreateFormData) => apiClients.post(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_BUILDING],
      });
    },
  });
};

export const useEditBuilding = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<BuildingEditFormData, Error, BuildingEditFormData>({
    mutationFn: (data: BuildingEditFormData) =>
      apiClients.patch<BuildingEditFormData>(data),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_BUILDING],
      });
    },
  });
};

export const useEditBuildingAddress = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<
    BuildingAddressEditFormData,
    Error,
    BuildingAddressEditFormData
  >({
    mutationFn: (data: BuildingAddressEditFormData) =>
      apiClients.patchNested<BuildingAddressEditFormData>(
        data,
        "address",
        data.id
      ),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_BUILDING],
      });
    },
  });
};

export const useDeleteBuilding = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: (existingData, newData) => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${BUILDINGS_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_BUILDING],
      });
    },
  });
};
