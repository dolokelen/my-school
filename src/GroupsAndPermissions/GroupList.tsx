import {
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BulkDeleteButton from "../components/BulkDeleteButton";
import {
  AUTH_LAYOUT_ROUTE,
  GROUP_ROUTE,
  deleteBtnColor,
} from "../data/constants";
import { useDeleteAllGroup, useGroups } from "../hooks/useGroups";
import GroupCreateForm from "./GroupCreateForm";

const GroupListPage = () => {
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const handleDeleteAll = useDeleteAllGroup(
    selectedGroups,
    () => toast.success("All deleted successfully!"),
    () => {
      setSelectedGroups([]);
    }
  );
  const { data: groups, isLoading, error } = useGroups();
  // useEffect(()=>{
  //   console.log("useEffect: ", selectedGroups)
  // },[selectedGroups]);

  if (error) throw error;
  if (isLoading) return <Spinner />;

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
        {selectedGroups.length === 0 ? (
          <Button isDisabled colorScheme={deleteBtnColor}>
            Delete All
          </Button>
        ) : (
          <BulkDeleteButton
            label={selectedGroups.length > 1 ? "Delete All" : "Delete"}
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
