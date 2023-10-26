import { List, ListItem, Link } from "@chakra-ui/react";
import { useCourses } from "../../hooks/useCourses";
import { useCourseStore } from "./courseStore";

const PrerequisiteFilter = () => {
  const { data: courses } = useCourses();
  const setSelectedPrerequisiteId = useCourseStore(
    (s) => s.setSelectedPrerequisite
  );
  const setShowAll = useCourseStore((s) => s.setRemoveAllFilters);
  return (
    <>
      <List>
        <ListItem>
          <Link onClick={() => setShowAll("")}>Show All</Link>
        </ListItem>
        {courses?.map((course) => (
          <ListItem key={course.id}>
            <Link onClick={() => setSelectedPrerequisiteId(course.id!)}>
              {course.code}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PrerequisiteFilter;
