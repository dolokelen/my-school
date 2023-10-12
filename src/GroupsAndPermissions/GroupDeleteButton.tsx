import { useRef } from "react";
// import { useDeleteSchoolYear } from "../../hooks/useSchoolYears";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

interface Props {
  schoolYearId: number;
  schoolYear: number;
}

const GroupDeleteButton = () => {
//   const deleteSchoolYear = useDeleteSchoolYear();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Group
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Heading as="h4">Group: ...</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to permanently delete ...?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                // onClick={() => deleteSchoolYear.mutate(schoolYearId)}
                colorScheme="red"
                ml={3}
              >
                Delete Group
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default GroupDeleteButton;
