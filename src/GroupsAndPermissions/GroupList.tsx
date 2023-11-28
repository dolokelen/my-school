import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BulkDeleteButton from "../Utilities/BulkDeleteButton";
import { AUTH_LAYOUT_ROUTE, GROUP_ROUTE, red } from "../cacheKeysAndRoutes";
import { useDeleteAllGroup, useGroups } from "../hooks/useGroups";
import GroupCreateForm from "./GroupCreateForm";
import OverflowYContainer from "./OverflowYContainer";
import { hasPermission } from "../Utilities/hasPermissions";
import AccessDenyPage from "../pages/AccessDenyPage";

const GroupListPage = () => {
  const { data: groups, isLoading, error } = useGroups();

  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const handleDeleteAll = useDeleteAllGroup(
    selectedGroups,
    () => toast.success("All deleted successfully!"),
    () => {
      setSelectedGroups([]);
    }
  );

  const canAddGroup = hasPermission("Can add group");
  const canDeleteGroup = hasPermission("Can delete group");

  if (!hasPermission("Can view group")) return <AccessDenyPage />;
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
      <Grid
        templateAreas={{
          base: `"groups deleteButton"`,
          //   sm: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: `.5fr 0.28fr`,
          //   sm: `225px 1fr`,
        }}
        justifyContent="space-evenly"
      >
        <GridItem area="groups" mt={6}>
          {canAddGroup && (
            <>
              <Heading>Group Creation Form</Heading>
              <GroupCreateForm />
            </>
          )}
        </GridItem>

        <GridItem area="deleteButton" mt={6}>
          <Heading ml={50}>All Groups</Heading>
          <OverflowYContainer>
            <List>
              {groups?.map((group) => (
                <ListItem fontSize={30} key={group.id}>
                  <Checkbox
                    isChecked={selectedGroups.includes(group.id!)}
                    onChange={() => handleCheckboxChange(group.id!)}
                  >
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}
                    >
                      {group.name}
                    </Link>
                  </Checkbox>
                </ListItem>
              ))}
            </List>
          </OverflowYContainer>
          {canDeleteGroup && (
            <Box ml="35%" mt={4}>
              {selectedGroups.length === 0 ? (
                <Button isDisabled colorScheme={red}>
                  Delete All
                </Button>
              ) : (
                <BulkDeleteButton
                  label={selectedGroups.length > 1 ? "Delete All" : "Delete"}
                  onDelete={handleDeleteAll}
                />
              )}
            </Box>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default GroupListPage;
