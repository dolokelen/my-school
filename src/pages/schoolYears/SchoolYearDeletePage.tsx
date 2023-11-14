import { useRef } from "react";
import { useDeleteSchoolYear } from "../../hooks/useSchoolYears";
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
import AccessDenyPage from "../AccessDenyPage";
import { hasPermission } from "../../Utilities/hasPermissions";

interface Props {
  schoolYearId: number;
  schoolYear: number;
}

const ConfirmationAlert = ({ schoolYearId, schoolYear }: Props) => {
  if (!hasPermission("Can delete school year")) return <AccessDenyPage />;
  
  const deleteSchoolYear = useDeleteSchoolYear();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete School Year
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Heading as="h4">School year: {schoolYear}</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to permanently delete {schoolYear}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => deleteSchoolYear.mutate(schoolYearId)}
                colorScheme="red"
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmationAlert;
