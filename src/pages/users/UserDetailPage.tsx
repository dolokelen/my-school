import { useParams } from "react-router-dom";
import UserEditForm from "./UserEditForm";

const UserDetailPage = () => {
  const { id } = useParams();
  const userId = parseInt(id!);
  return (
    <>
      <UserEditForm />
    </>
  );
};

export default UserDetailPage;
