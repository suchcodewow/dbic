import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "contexts/UserContext";

export function RouteGuard({ children }) {
  const { user } = useUserContext();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [user]);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in

    const publicPaths = ["/", "/login", "/store"];
    const path = url.split("?")[0];
    if (user.user) {
      if (!user.user && !publicPaths.includes(path)) {
        console.log("send to login", user);
        setAuthorized(false);
        router.push({
          pathname: "/login",
          query: { returnUrl: router.asPath },
        });
      } else {
        setAuthorized(true);
        console.log("public site or user loggedin: ", user);
      }
    } else {
      console.log("skipping", user);
      setAuthorized(true);
    }
  }
  // return authorized && children;
  return authorized && children;
}
