import { Helmet } from 'react-helmet-async';

import { PendingOrdersPage } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> DG Restaurant </title>
      </Helmet>

      <PendingOrdersPage />
    </>
  );
}
