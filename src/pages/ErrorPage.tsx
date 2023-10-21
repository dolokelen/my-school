import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { red } from "../cacheKeysAndRoutes";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Heading mx="40%" mt="10%">Oops!</Heading>
      {isRouteErrorResponse(error) ? (
        <Text mx="40%" fontSize={40} color={red}>
          Page Does Not Exist.
        </Text>
      ) : (
        <Text fontSize={40} color={red}>
          Something is not right, the system has notified the developer and it will
          be resolved soon.
        </Text>
      )}
    </>
  );
};

export default ErrorPage;
