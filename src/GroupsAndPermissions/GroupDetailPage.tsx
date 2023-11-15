import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DeletionConfirmation from "../Utilities/DeletionConfirmation";
import { blue, red } from "../cacheKeysAndRoutes";
import {
  useDeleteGroup,
  useGroup,
  useUpdateGroupPermissions,
} from "../hooks/useGroups";
import GroupEditForm from "./GroupEditForm";
import OverflowYContainer from "./OverflowYContainer";
import PermissionList from "./PermissionList";
import { hasPermission } from "../Utilities/hasPermissions";
import AccessDenyPage from "../pages/AccessDenyPage";

const GroupDetailPage = () => {
  const { id } = useParams();
  const groupId = parseInt(id!);

  const { data: group, isLoading, error } = useGroup(groupId);

  const mutation = useDeleteGroup(() => toast.success("Deleted successfully."));
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionsRemoval = useUpdateGroupPermissions(
    { id: groupId, permission_ids_to_remove: selectedPermissions },
    () => {
      setSelectedPermissions([]);
      toast.success("Permissions removed successfully!");
    }
  );

  const canChangeGroup = hasPermission("Can change group");
  const canChangePermission = hasPermission("Can change permission");
  
  if (!hasPermission("Can view group")) return <AccessDenyPage />;
  if (error) throw error;
  if (isLoading) return <Spinner />;

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
      {canChangeGroup && <GroupEditForm />}
      {canChangePermission ? (
        <>
          <HStack fontSize={30} mt={8} mb={3} justifyContent="space-evenly">
            <Box ml="-10%">{group.name} Permissions</Box>
            <Box>Available Permissions</Box>
          </HStack>

          <Grid
            templateAreas={{
              base: `"groupPermissions unAssignPermissions" "buttons buttons"`,
              //   sm: `"nav nav" "aside main"`,
            }}
            templateColumns={{
              base: `0.29fr 0.29fr`,
              //   sm: `225px 1fr`,
            }}
            justifyContent="space-evenly"
          >
            <GridItem area="groupPermissions">
              <OverflowYContainer>
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
                    <ListItem color={red}>No assigned permissions</ListItem>
                  )}
                </List>
              </OverflowYContainer>
            </GridItem>

            <GridItem area="unAssignPermissions">
              <PermissionList assignPermissions={group.permissions} />
            </GridItem>

            <GridItem area="buttons">
              <Flex justifyContent="space-evenly">
                {selectedPermissions.length === 0 ? (
                  <Button isActive isDisabled colorScheme={blue}>
                    Remove
                  </Button>
                ) : (
                  <Button
                    isActive
                    onClick={handlePermissionsRemoval}
                    colorScheme={blue}
                  >
                    Remove
                  </Button>
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
            </GridItem>
          </Grid>
        </>
      ) : (
        <AccessDenyPage />
      )}
    </>
  );
};

export default GroupDetailPage;
