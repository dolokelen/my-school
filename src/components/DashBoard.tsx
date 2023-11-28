import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { hasPermission } from "../Utilities/hasPermissions";
import {
  BUILDINGS_CREATE_ROUTE,
  BUILDINGS_ROUTE,
  CLASSROOMS_CREATE_ROUTE,
  CLASSROOMS_ROUTE,
  CLASSTIMES_CREATE_ROUTE,
  CLASSTIMES_ROUTE,
  COURSES_CREATE_ROUTE,
  COURSES_LIST_ROUTE,
  DEPARTMENTS_ROUTE,
  DEPARTMENT_CREATE_ROUTE,
  EMPLOYEES_ROUTE,
  EMPLOYEE_REGISTER_ROUTE,
  GROUP_ROUTE,
  MAJORS_CREATE_ROUTE,
  MAJORS_ROUTE,
  OFFICES_CREATE_ROUTE,
  OFFICES_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SCH_YEAR_LIST_ROUTE,
  SECTIONS_CREATE_ROUTE,
  SECTIONS_ROUTE,
  SEMESTERS_ROUTE,
  SEMESTER_CREATE_ROUTE,
  STUDENTS_ROUTE,
  STUDENT_REGISTER_ROUTE,
  TEACHERS_ROUTE,
  TEACHER_REGISTER_ROUTE,
} from "../cacheKeysAndRoutes";

const DashBoard = () => {
  return (
    <Stack border="1px solid #fff">
      {/* {hasPermission("Can view user") && <Link to={USER_ROUTE}>Users</Link>} */}
      {hasPermission("Can view employee") && (
        <Link to={EMPLOYEES_ROUTE}>Employees</Link>
      )}
      {hasPermission("Can add employee") && (
        <Link to={EMPLOYEE_REGISTER_ROUTE}>Employee Registration Form</Link>
      )}
      {hasPermission("Can view teacher") && (
        <Link to={TEACHERS_ROUTE}>Teachers</Link>
      )}
      {hasPermission("Can add teacher") && (
        <Link to={TEACHER_REGISTER_ROUTE}>Teacher Registration Form</Link>
      )}
      {hasPermission("Can view student") && (
        <Link to={STUDENTS_ROUTE}>Students</Link>
      )}
      {hasPermission("Can add student") && (
        <Link to={STUDENT_REGISTER_ROUTE}>Student Registration Form</Link>
      )}
      {hasPermission("Can view group") && <Link to={GROUP_ROUTE}>Groups</Link>}

      <Link to={PROFILE_ROUTE}>Profile</Link>

      {hasPermission("Can view school year") && (
        <Link to={SCH_YEAR_LIST_ROUTE}>School years</Link>
      )}
      {hasPermission("Can add user") && (
        <Link to={REGISTER_ROUTE}>Registration Form</Link>
      )}
      {hasPermission("Can view course") && (
        <Link to={COURSES_LIST_ROUTE}>Courses</Link>
      )}
      {hasPermission("Can add course") && (
        <Link to={COURSES_CREATE_ROUTE}>Course Create From</Link>
      )}
      {hasPermission("Can view department") && (
        <Link to={DEPARTMENTS_ROUTE}>Departments</Link>
      )}
      {hasPermission("Can add department") && (
        <Link to={DEPARTMENT_CREATE_ROUTE}>Department Create Form</Link>
      )}
      {hasPermission("Can view semester") && (
        <Link to={SEMESTERS_ROUTE}>Semesters</Link>
      )}
      {hasPermission("Can add semester") && (
        <Link to={SEMESTER_CREATE_ROUTE}>Semester Create Form</Link>
      )}
      {hasPermission("Can view building") && (
        <Link to={BUILDINGS_ROUTE}>Buildings</Link>
      )}
      {hasPermission("Can add building") && (
        <Link to={BUILDINGS_CREATE_ROUTE}>Building Create Form</Link>
      )}
      {hasPermission("Can view office") && (
        <Link to={OFFICES_ROUTE}>Offices</Link>
      )}
      {hasPermission("Can add office") && (
        <Link to={OFFICES_CREATE_ROUTE}>Office Create Form</Link>
      )}
      {hasPermission("Can view major") && <Link to={MAJORS_ROUTE}>Majors</Link>}
      {hasPermission("Can add major") && (
        <Link to={MAJORS_CREATE_ROUTE}>Major Create Form</Link>
      )}
      {hasPermission("Can view class room") && (
        <Link to={CLASSROOMS_ROUTE}>Classrooms</Link>
      )}
      {hasPermission("Can add class room") && (
        <Link to={CLASSROOMS_CREATE_ROUTE}>Classroom Create Form</Link>
      )}
      {hasPermission("Can view class time") && (
        <Link to={CLASSTIMES_ROUTE}>Classtimes</Link>
      )}
      {hasPermission("Can add class time") && (
        <Link to={CLASSTIMES_CREATE_ROUTE}>Classtime Create Form</Link>
      )}
      {hasPermission("Can view section") && (
        <Link to={SECTIONS_ROUTE}>Sections</Link>
      )}
      {hasPermission("Can add section") && (
        <Link to={SECTIONS_CREATE_ROUTE}>Section Create Form</Link>
      )}
    </Stack>
  );
};

export default DashBoard;
