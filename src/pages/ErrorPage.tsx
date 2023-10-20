import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { red } from "../cacheKeysAndRoutes";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Box mx="40%" my="10%">
      <Heading>Oops!</Heading>
      {isRouteErrorResponse(error) ? (
        <Text fontSize={40} color={red}>
          Page Does Not Exist.
        </Text>
      ) : (
        <Text fontSize={40} color={red}>
          Something is not right, the system has notified the developer and it will
          be resolved soon.
        </Text>
      )}
    </Box>
  );
};

export default ErrorPage;
