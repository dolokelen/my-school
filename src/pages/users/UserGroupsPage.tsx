import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OverflowYContainer from "../../GroupsAndPermissions/OverflowYContainer";
import {
  AUTH_LAYOUT_ROUTE,
  GROUP_ROUTE,
  blue,
  red,
  teal,
} from "../../cacheKeysAndRoutes";
import { useGroups } from "../../hooks/useGroups";
import {
  useAddGroupsToUser,
  useRemoveGroupsFromUser,
  useUser,
} from "../../hooks/useUsers";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

interface Props {
  userPk: number;
}

const UserGroupsPage = ({ userPk }: Props) => {
  const { data: user } = useUser(userPk);
  const { data: groups, error } = useGroups();
  const [groupIdsToAdd, setGroupIdsToAdd] = useState<number[]>([]);
  const [groupIdsToRemove, setGroupIdsToRemove] = useState<number[]>([]);
  const pk = userPk;

  const handleAddUserToGroups = useAddGroupsToUser(
    { pk, group_to_add_ids: groupIdsToAdd },
    () => {
      toast.success("User successfully added to group!");
      setGroupIdsToAdd([]);
    }
  );

  const handleRemoveGroupsFromUser = useRemoveGroupsFromUser(
    { pk, group_to_remove_ids: groupIdsToRemove },
    () => {
      toast.success("User successfully from group!");
      setGroupIdsToRemove([]);
    }
  );

  const canChangePermission = hasPermission("Can change permission");

  if (error) return <Text color={red}>There was error in getting groups</Text>;

  const handleCheckboxChangeForAdd = (groupId: number) => {
    if (groupIdsToAdd.includes(groupId)) {
      setGroupIdsToAdd(groupIdsToAdd.filter((id) => id !== groupId));
    } else {
      setGroupIdsToAdd([...groupIdsToAdd, groupId]);
    }
  };

  const handleCheckboxChangeForRemove = (groupId: number) => {
    if (groupIdsToRemove.includes(groupId)) {
      setGroupIdsToRemove(groupIdsToRemove.filter((id) => id !== groupId));
    } else {
      setGroupIdsToRemove([...groupIdsToRemove, groupId]);
    }
  };

  if (canChangePermission)
    return (
      <Grid
        templateAreas={{
          base: `"userGroups availableGroups" "addUserGroup removeUserGroup"`,
          //   sm: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: `0.2fr 0.2fr`,
          //   sm: `225px 1fr`,
        }}
        justifyContent="space-evenly"
      >
        <GridItem area="userGroups">
          <Box fontWeight="bold" mt={8} mb={4}>
            {user?.username} Groups
          </Box>
          <OverflowYContainer>
            <Stack>
              {user?.groups?.length ? (
                user?.groups.map((group) => (
                  <Checkbox
                    key={group.id}
                    isChecked={groupIdsToRemove.includes(group.id!)}
                    onChange={() => handleCheckboxChangeForRemove(group.id!)}
                  >
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}
                    >
                      {group.name}
                    </Link>
                  </Checkbox>
                ))
              ) : (
                <Text color={red}>No assigned group</Text>
              )}
            </Stack>
          </OverflowYContainer>
        </GridItem>

        <GridItem area="availableGroups">
          <Box fontWeight="bold" mt={8} mb={4}>
            Available Groups
          </Box>
          <OverflowYContainer>
            <Stack>
              {groups
                ?.filter((g) => !user?.groups?.some((ug) => ug.id === g.id))
                .map((group) => (
                  <Checkbox
                    key={group.id}
                    isChecked={groupIdsToAdd.includes(group.id!)}
                    onChange={() => handleCheckboxChangeForAdd(group.id!)}
                  >
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}
                    >
                      {group.name}
                    </Link>
                  </Checkbox>
                ))}
            </Stack>
          </OverflowYContainer>
        </GridItem>
        <GridItem area="addUserGroup">
          <Button
            w="100%"
            colorScheme={teal}
            onClick={handleRemoveGroupsFromUser}
          >
            Remove
          </Button>
        </GridItem>

        <GridItem area="removeUserGroup">
          <Button w="100%" colorScheme={blue} onClick={handleAddUserToGroups}>
            Add To Group
          </Button>
        </GridItem>
      </Grid>
    );
    
  return <></>
};

export default UserGroupsPage;
