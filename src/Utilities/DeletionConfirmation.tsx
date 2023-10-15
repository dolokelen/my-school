import { useRef } from "react";
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
import { deleteBtnColor } from "../cacheKeysAndRoutes";

interface Props {
  entityId: number;
  entityName: number | string;
  label: string;
  onMutate: (entityId: number) => void;
}

const DeletionConfirmation = ({
  entityId,
  entityName,
  label,
  onMutate,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button isActive colorScheme={deleteBtnColor} onClick={onOpen}>
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
              <Heading as="h4">{entityName}</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to permanently delete {entityName}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button
                isActive
                type="submit"
                onClick={() => onMutate(entityId)}
                colorScheme={deleteBtnColor}
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

export default DeletionConfirmation;
