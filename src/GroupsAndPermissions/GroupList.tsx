import {
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
  flexbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGroups } from "../hooks/useGroups";
import {
  AUTH_LAYOUT_ROUTE,
  GROUP_ROUTE,
  SCH_YEAR_LIST_ROUTE,
} from "../data/constants";
import GroupCreateForm from "./GroupCreateForm";
import GroupDeleteButton from "./GroupDeleteButton";

const GroupListPage = () => {
  //   const [params, setParams] = useSearchParams();
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const { data: groups, isLoading, error } = useGroups();

  //   const removeUpdatedQueryParam = () => {
  //     const updatedParam = params.get("updated");
  //     if (updatedParam) {
  //       params.delete("updated");
  //       setParams(params);
  //     }
  //     const deletedParam = params.get("deleted");
  //     if (deletedParam) {
  //       params.delete("deleted");
  //       setParams(params);
  //     }
  //   };

  //   useEffect(() => {
  //     if (params.get("updated")) {
  //       toast.success("School year updated successfully!");
  //       removeUpdatedQueryParam();
  //     }
  //     if (params.get("deleted")) {
  //       toast.success("School year deleted successfully!");
  //       removeUpdatedQueryParam();
  //     }
  //   }, [params]);

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
        {selectedGroups.length === 0 ? (
          <Button isDisabled colorScheme="red">
            Delete Group
          </Button>
        ) : (
            <GroupDeleteButton />
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
