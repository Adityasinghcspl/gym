import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Trainers from '../components/Tables/Trainers';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Trainer" />

      <div className="flex flex-col gap-10">
        <Trainers/>
      </div>
    </>
  );
};

export default Tables;
