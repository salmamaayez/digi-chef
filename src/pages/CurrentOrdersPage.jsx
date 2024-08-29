import { Helmet } from 'react-helmet-async';

import CurrentOrdersPage from 'src/sections/overview/CurrentOrdersPage';

// ----------------------------------------------------------------------

export default function CurrentOrderPage() {
  return (
    <>
      <Helmet>
        <title> DG Restaurant </title>
      </Helmet>

      <CurrentOrdersPage />
    </>
  );
}