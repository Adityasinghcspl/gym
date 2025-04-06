import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Users from '../components/Tables/Users';

const User = () => {
  return (
    <>
      <Breadcrumb pageName="User" />

      <div className="flex flex-col gap-10">
        <Users/>
      </div>
    </>
  );
};

export default User;
