import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BulkDeleteButton from "../Utilities/BulkDeleteButton";
import DeletionConfirmation from "../Utilities/DeletionConfirmation";
import { blue, red } from "../cacheKeysAndRoutes";
import {
  useDeleteGroup,
  useGroup,
  useUpdateGroupPermissions,
} from "../hooks/useGroups";
import GroupEditForm from "./GroupEditForm";
import PermissionList from "./PermissionList";

const GroupDetailPage = () => {
  const { id } = useParams();
  const groupId = parseInt(id!);
  const { data: group, isLoading, error } = useGroup(groupId);
  if (error) throw error;
  if (isLoading) return <Spinner />;

  const mutation = useDeleteGroup(() => toast.success("Deleted successfully."));
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionsRemoval = useUpdateGroupPermissions(
    { id: groupId, permissions_to_remove: selectedPermissions },
    () => {
      setSelectedPermissions([]);
      toast.success("Permissions removed successfully!");
    }
  );

  const handleCheckboxChange = (permissionId: number) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  return (
    <>
      <GroupEditForm />
      <HStack fontSize={30} mt={8} mb={3} justifyContent="space-evenly">
        <Box>{group.name} Group Permissions</Box>
        <Box>Available Permissions</Box>
      </HStack>
      <HStack fontSize={30} mt={8} mb={3} justifyContent="space-evenly">
        <List>
          {group.permissions?.length ? (
            group.permissions?.map((p) => (
              <ListItem key={p.id}>
                <Checkbox
                  isChecked={selectedPermissions.includes(p.id)}
                  onChange={() => handleCheckboxChange(p.id)}
                >
                  {p.name}
                </Checkbox>
              </ListItem>
            ))
          ) : (
            <ListItem color={red}>
              No available permissions for this group
            </ListItem>
          )}
        </List>
        <PermissionList />
      </HStack>

      <Flex justifyContent="space-evenly">
        {selectedPermissions.length === 0 ? (
          <Button isActive isDisabled colorScheme={blue}>
            Remove
          </Button>
        ) : (
          <BulkDeleteButton
            label="Remove"
            entityName="Permissions"
            color={blue}
            onDelete={handlePermissionsRemoval}
          />
        )}

        <DeletionConfirmation
          entityId={groupId}
          entityName={group.name}
          label="Delete Group"
          onMutate={() => mutation.mutate(groupId)}
        />

        <Button isActive isDisabled colorScheme={blue}>
          Add
        </Button>
      </Flex>
    </>
  );
};

export default GroupDetailPage;
