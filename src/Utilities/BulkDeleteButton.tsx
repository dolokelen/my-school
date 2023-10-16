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
import { useRef } from "react";
import { red } from "../cacheKeysAndRoutes";

interface Props {
  onDelete: () => void;
  entityName?: string;
  label: string;
  color?: string;
}

const BulkDeleteButton = ({ label, entityName, color, onDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button isActive colorScheme={ color ? color : red} onClick={onOpen}>
        {label}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Heading as="h4">
                {entityName ? entityName : "Caution! 💀"}
              </Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to permanently delete all?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button isActive ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                isActive
                type="submit"
                onClick={onDelete}
                colorScheme={ color ? color : red}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BulkDeleteButton;
