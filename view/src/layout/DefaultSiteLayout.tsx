import React, { useState, ReactNode } from 'react';
import SiteHeader from '../components/Header/SiteHeader';

const DefaultSiteLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeBarOpen, setActiveBararOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <SiteHeader activeBarOpen={activeBarOpen} setActiveBararOpen={setActiveBararOpen}/>
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <main>
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      {/* <!-- ===== Content Area End ===== --> */}
    </div>
  );
};

export default DefaultSiteLayout;
