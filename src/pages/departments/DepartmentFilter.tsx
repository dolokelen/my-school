import { Link, List, ListItem, Spinner } from "@chakra-ui/react";
import { useDepartment } from "../../hooks/useDepartments";
import { useCourseStore } from "../courses/courseStore";

const DepartmentFilter = () => {
  const { data: departments, isLoading } = useDepartment();
  
  const setSelectedDepartmentId = useCourseStore(
    (s) => s.setSelectedDepartmentId
  );
  const setShowAll = useCourseStore((s) => s.setRemoveAllFilters);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div>Filter By Department</div>
      <List>
        <ListItem>
          <Link onClick={() => setShowAll("")}>Show All</Link>
        </ListItem>
        {departments?.map((depar) => (
          <ListItem key={depar.id}>
            <Link onClick={() => setSelectedDepartmentId(depar.id!)}>
              {depar.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default DepartmentFilter;
