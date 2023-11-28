import {
  Button,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { hasPermission } from "../../Utilities/hasPermissions";
import { attendanceLetters } from "../../accounts/data";
import { blue } from "../../cacheKeysAndRoutes";
import { useCreateAttendances } from "../../hooks/useAttendances";
import { useSectionEnrollments } from "../../hooks/useEnrollments";
import AccessDenyPage from "../AccessDenyPage";

interface Props {
  sectionId: number;
}

export interface AttendanceData {
  student: number;
  school_year: number;
  semester: number;
  course: number;
  section: number;
  mark: string;
  comment: string;
}

const AttendanceCreateForm = ({ sectionId }: Props) => {
  const [attendances, setAttendances] = useState<AttendanceData[]>([]);
  const { data: sectionEnrollments } = useSectionEnrollments(sectionId);

  const onCreate = () => toast.success("Attendance Logged Successfully!");
  const handleCreate = useCreateAttendances(sectionId, attendances, onCreate);

  useEffect(() => {
    if (sectionEnrollments) {
      const enrollments = sectionEnrollments.map((enroll) => ({
        student: enroll.student.user.id,
        course: enroll.course.id,
        section: enroll.section.id,
        semester: enroll.semester.id,
        school_year: enroll.school_year.id,
        mark: "P",
        comment: "",
      }));

      setAttendances(enrollments);
    }
  }, [sectionEnrollments, sectionId]);

  const handleAttendanceMark = (student_id: number, letter: string) => {
    if (letter) {
      const attendance_record = attendances.find(
        (attend) => attend.student === student_id
      );

      const filteredAttendances = attendances.filter(
        (att) => att.student !== student_id
      );

      if (attendance_record) {
        const new_record = { ...attendance_record, mark: letter };
        setAttendances([...filteredAttendances, new_record]);
      }
    }
  };

  const handleAttendanceComment = (student_id: number, comment: string) => {
    if (comment.length >= 1 || comment.length <= 1) {
      const attendance_record = attendances.find(
        (attend) => attend.student === student_id
      );

      const filteredAttendances = attendances.filter(
        (att) => att.student !== student_id
      );

      if (attendance_record) {
        const new_record = { ...attendance_record, comment: comment };
        setAttendances([...filteredAttendances, new_record]);
      }
    }
  };

  if (!hasPermission("Can add attendance")) return <AccessDenyPage />;

  const handleAttancenceTitle = () => {
    if (sectionEnrollments) {
      const sectionName = sectionEnrollments[0].section.name;
      const sectionCourseName = sectionEnrollments[0].course.code;
      const sectionSemesterName = sectionEnrollments[0].semester.name;
      const sectionSchoolName = sectionEnrollments[0].school_year.year;

      return `${sectionCourseName} Sec ${sectionName}, ${sectionSchoolName} Semester ${sectionSemesterName} Attendance Log`;
    }
    return "";
  };

  const currentDate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <>
      <Heading size="md" ml="30%" my="3rem">
        {handleAttancenceTitle()}
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Student</Th>
              <Th>Letter</Th>
              <Th>Comment</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sectionEnrollments?.map((enrol) => (
              <Tr key={enrol.id}>
                <Td>
                  {enrol?.student.user.first_name}{" "}
                  {enrol?.student.user.last_name}
                </Td>

                <Td>
                  <Select
                    onChange={(e) => {
                      handleAttendanceMark(
                        enrol.student.user.id,
                        e.target.value
                      );
                    }}
                  >
                    {attendanceLetters.map((letter) => (
                      <option
                        key={letter.id}
                        value={letter.name}
                        style={{
                          backgroundColor:
                            letter.name === "P"
                              ? "blue"
                              : letter.name === "A"
                              ? "red"
                              : letter.name === "E"
                              ? "green"
                              : letter.name === "T"
                              ? "gold"
                              : "",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        {letter.name}
                      </option>
                    ))}
                  </Select>
                </Td>

                <Td>
                  <Input
                    w="12rem"
                    onChange={(e) =>
                      handleAttendanceComment(
                        enrol.student.user.id,
                        e.target.value
                      )
                    }
                  />
                </Td>
                <Td>{currentDate()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Button type="submit" colorScheme={blue} onClick={handleCreate}>
        Submit
      </Button>
    </>
  );
};

export default AttendanceCreateForm;
