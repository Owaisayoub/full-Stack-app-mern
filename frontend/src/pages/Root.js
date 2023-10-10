import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
    const tokenDuration = getTokenDuration();

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", mehtod: "post" });
    }
    setTimeout(() => {
      submit(null, { action: "/logout", mehtod: "post" });
    }, tokenDuration);
  }, [token, submit]);
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
