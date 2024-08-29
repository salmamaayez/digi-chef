import { Helmet } from 'react-helmet-async';

import { CompletedOrdersPage} from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function CompletedOrderPage() {
  return (
    <>
      <Helmet>
        <title> DG Restaurant </title>
      </Helmet>

      <CompletedOrdersPage />
    </>
  );
}
