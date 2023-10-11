import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Box mx="40%" my="10%">
      <Heading>Oops!</Heading>
      {isRouteErrorResponse(error) ? (
        <Text fontSize={40} color='red'>Page Does Not Exist.</Text>
      ) : (
        <Text fontSize={40} color='red'>
          The system has notified the developer, hope to resove it soon.
        </Text>
      )}
    </Box>
  );
};

export default ErrorPage;
