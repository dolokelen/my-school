import { Box, Button, Checkbox, Grid, GridItem, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AUTH_LAYOUT_ROUTE,
  GROUP_ROUTE,
  blue,
  teal,
} from "../../cacheKeysAndRoutes";
import { useGroups } from "../../hooks/useGroups";
import {
  useAddGroupsToUser,
  useRemoveGroupsFromUser,
  useUser,
} from "../../hooks/useUsers";

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

  if (error) return;

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

  return (
    <Grid
      templateAreas={{
        base: `"userGroups availableGroups"`,
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
        <Stack>
          {user?.groups.map((group) => (
            <Checkbox
              key={group.id}
              isChecked={groupIdsToRemove.includes(group.id!)}
              onChange={() => handleCheckboxChangeForRemove(group.id!)}
            >
              <Link to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}>
                {group.name}
              </Link>
            </Checkbox>
          ))}
          <Button colorScheme={teal} onClick={handleRemoveGroupsFromUser}>
            Remove
          </Button>
        </Stack>
      </GridItem>

      <GridItem area="availableGroups">
        <Box fontWeight="bold" mt={8} mb={4}>
          Available Groups
        </Box>
        <Stack>
          {groups?.map((group) => (
            <Checkbox
              key={group.id}
              isChecked={groupIdsToAdd.includes(group.id!)}
              onChange={() => handleCheckboxChangeForAdd(group.id!)}
            >
              <Link to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}>
                {group.name}
              </Link>
            </Checkbox>
          ))}
          <Button colorScheme={blue} onClick={handleAddUserToGroups}>
            Add
          </Button>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default UserGroupsPage;
