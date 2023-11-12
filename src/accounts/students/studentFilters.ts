import { Department } from "../../hooks/useDepartments";
import { Major } from "../../hooks/useMajors";
import { useStudentStore } from "./studentStore";

const studentFilters = (departments?: Department[], majors?: Major[]) => {
  const { setSelectedMajorId, setSelectedDepartmentId, setSearchText } =
    useStudentStore();

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartmentId = departments?.find(
      (d) => d.name === e.target.value
    )?.id;
    setSelectedDepartmentId(selectedDepartmentId!);
  };

  const handleMajorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMajorId = majors?.find((d) => d.name === e.target.value)?.id;
    setSelectedMajorId(selectedMajorId!);
  };

  return { handleDepartmentChange, handleMajorChange, setSearchText };
};

export default studentFilters;
