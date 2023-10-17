import { Box, Button, Checkbox, Grid, GridItem, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { blue } from "../../cacheKeysAndRoutes";
import { useGroups } from "../../hooks/useGroups";
import { useAddGroupsToUser } from "../../hooks/useUsers";

interface Props {
  userPk: number;
}

const UserGroupsPage = ({ userPk }: Props) => {
  const { data: groups, error, isLoading } = useGroups();
  const [selectedGroupIds, setSelectedGroups] = useState<number[]>([]);

  const pk = userPk;
  const handleAddUserToGroups = useAddGroupsToUser(
    { pk, group_ids: selectedGroupIds },
    () => {
      toast.success("User successfully added to group!");
      setSelectedGroups([]);
    }
  );

  if (error) throw error;
  if (isLoading) return;

  const handleCheckboxChange = (groupId: number) => {
    if (selectedGroupIds.includes(groupId)) {
      setSelectedGroups(selectedGroupIds.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroupIds, groupId]);
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
          User Groups {userPk}
        </Box>
        <Stack>
          <Checkbox>one</Checkbox>
          <Checkbox>Two</Checkbox>
          <Checkbox>Three</Checkbox>
        </Stack>
      </GridItem>

      <GridItem area="availableGroups">
        <Box fontWeight="bold" mt={8} mb={4}>
          Available Groups {userPk}
        </Box>
        <Stack>
          {groups?.map((group) => (
            <Checkbox
              key={group.id}
              isChecked={selectedGroupIds.includes(group.id!)}
              onChange={() => handleCheckboxChange(group.id!)}
            >
              {group.name}
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
