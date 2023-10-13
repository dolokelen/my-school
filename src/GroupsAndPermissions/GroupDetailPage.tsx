import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
  grid,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDeleteGroup, useGroup } from "../hooks/useGroups";
import GroupEditForm from "./GroupEditForm";
import DeletionConfirmation from "../components/DeletionConfirmation";
import { toast } from "react-toastify";
import getUserId from './../data/getUserId';

const GroupDetailPage = () => {
  const mutation = useDeleteGroup(() => toast.success("Deleted successfully."));
  const { id } = useParams();
  const groupId = parseInt(id!);
  const { data: group, isLoading, error } = useGroup(groupId);

  if (error) return <Text color="red">{error.message}</Text>;
  if (isLoading) return <Spinner />;

  return (
    <>
      <GroupEditForm />
      <Box fontSize={30} mt={8} mb={3}>
        {group.name} Group Permissions
      </Box>
      <List>
        {group.permissions?.map((p) => (
          <ListItem key={p}>{p ? p : "No available permissions"}</ListItem>
        ))}
      </List>
      <Box ml="90%">
        <DeletionConfirmation
          entityId={groupId}
          entityName={group.name}
          label="Delete"
          onMutate={() => mutation.mutate(groupId)}
        />
      </Box>
    </>
  );
};

export default GroupDetailPage;
