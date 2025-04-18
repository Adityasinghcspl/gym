import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
  leftElement?: React.ReactNode;
}
const Breadcrumb = ({ pageName, leftElement }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {!leftElement && <h2 className="text-title-md2 font-semibold text-black dark:text-white">{pageName}</h2>}

      {leftElement}

      <div className="flex items-center gap-4">
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
