import { useParams } from "react-router-dom";
import { useCourse } from "../../hooks/useCourses";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";

const CourseDetailPage = () => {
  const { pk } = useParams();
  const courseId = parseInt(pk!);

  const { data: course, isLoading } = useCourse(courseId);

  if (isLoading) return <Spinner />;
  const bold = "bold";

  return (
    <>
      <Heading>{course?.title}</Heading>
      <Text fontWeight={bold}>Code: {course?.code}</Text>
      <Text fontWeight={bold}>Title: {course?.title}</Text>
      <Text fontWeight={bold}>Level: {course?.level}</Text>
      <Text fontWeight={bold}>Department: {course?.department}</Text>
      <Text fontWeight={bold}>
        Prerequisite: {course?.prerequisite ? course?.prerequisite : "None"}
      </Text>
      <Text fontWeight={bold}>Credit hours: {course?.credit}</Text>
      <Text fontWeight={bold}>
        Price per Credit hour: $ {course?.price_per_credit.toFixed(2)}
      </Text>
      <Text fontWeight={bold}>
        Additional fee: $ {course?.additional_fee.toFixed(2)}
      </Text>
      <Text fontWeight={bold}>
        Totial price: $ {course?.total_price.toFixed(2)}
      </Text>
    </>
  );
};

export default CourseDetailPage;
