import { Heading, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGroup } from "../hooks/useGroups";

const GroupDetailPage = () => {
  const { id } = useParams();
  const groupId = parseInt(id!);
  const { data: group, isLoading, error } = useGroup(groupId);

  if (error) return <Text color="red">{error.message}</Text>;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading marginY={4} as="h3">
        {group.name} Group Permissions
      </Heading>
      <List>
        {group.permissions?.map((p) => (
          <ListItem key={p}>{p ? p : "No available permissions"}</ListItem>
        ))}
      </List>
    </>
  );
};

export default GroupDetailPage;
