import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { blue } from "../cacheKeysAndRoutes";
import { useAddGroupPermissions } from "../hooks/useGroups";
import { usePermissions } from "../hooks/usePermissions";

const PermissionList = () => {
  const { data, isLoading, error } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const { id } = useParams();
  const groupId = parseInt(id!);

  const handleAddPermissions = useAddGroupPermissions(
    { id: groupId, permission_ids_to_add: selectedPermissions },
    () => {
      setSelectedPermissions([]);
      toast.success("Permissions removed successfully!");
    }
  );

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
      <Box maxH="300px" overflowY="auto">
        <List>
          {data.map((p) => (
            <ListItem key={p.id}>
              <Checkbox
                isChecked={selectedPermissions.includes(p.id)}
                onChange={() => handleCheckboxChange(p.id)}
              >
                {p.name}
              </Checkbox>
            </ListItem>
          ))}
        </List>
        {selectedPermissions.length === 0 ? (
          <Button isActive isDisabled colorScheme={blue}>
            Add
          </Button>
        ) : (
          <Button isActive onClick={handleAddPermissions} colorScheme={blue}>
            Add
          </Button>
        )}
      </Box>
    </>
  );
};

export default PermissionList;
