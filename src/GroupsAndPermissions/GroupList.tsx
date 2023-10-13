import {
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_LAYOUT_ROUTE, GROUP_ROUTE } from "../data/constants";
import { useDeleteAllGroup, useGroups } from "../hooks/useGroups";
import GroupCreateForm from "./GroupCreateForm";
import MultipleDeletionsConfirmation from "../components/MutipleDeletionsConfirmation";

const GroupListPage = () => {
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const handleDeleteAll = useDeleteAllGroup(selectedGroups, () =>
    toast.success("Deletes everything successfully!")
  );
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red">{error.message}</Text>;

  const handleCheckboxChange = (groupId: number) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  return (
    <>
      <Box marginY={6}>
        <GroupCreateForm />
      </Box>
      <HStack justifyContent="space-evenly">
        <Heading>Groups</Heading>
        {selectedGroups.length < 2 ? (
          <Button isDisabled colorScheme="red">Delete All</Button>
        ) : (
          <MultipleDeletionsConfirmation
            label="Delete All"
            onDelete={handleDeleteAll}
          />
        )}
      </HStack>
      <HStack justifyContent="space-around">
        <List>
          {groups?.map((group) => (
            <ListItem
              _hover={{ cursor: "pointer" }}
              fontSize={30}
              key={group.id}
            >
              <Checkbox
                isChecked={selectedGroups.includes(group.id!)}
                onChange={() => handleCheckboxChange(group.id!)}
              >
                <Link to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}>
                  {group.name}
                </Link>
              </Checkbox>
            </ListItem>
          ))}
        </List>
        <Box></Box>
      </HStack>
    </>
  );
};

export default GroupListPage;
