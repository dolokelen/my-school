import { useParams } from "react-router-dom";
import UserEditForm from "./UserEditForm";
import UserGroupsPage from "./UserGroupsPage";

const UserDetailPage = () => {
  const { pk } = useParams();
  const userId = parseInt(pk!);
  return (
    <>
      <UserEditForm />
      <UserGroupsPage userPk={userId} />
    </>
  );
};

export default UserDetailPage;
