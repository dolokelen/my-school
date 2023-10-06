import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

interface SchoolYear {
  id: number;
  year: number;
}
const apiClient = new APIClient<SchoolYear>("school/years");

const useSchoolYear = () =>
  useQuery<SchoolYear[], Error>({
    queryKey: ['schoolYear'],
    queryFn: apiClient.getAll
});

export default useSchoolYear;

