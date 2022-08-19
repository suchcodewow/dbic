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
    // console.log("*Auth for user: ", user);
    // if (!user) {
    //   console.log("skip this pass", user);
    // } else {
    if (user.prerender) {
      // console.log("server loading so no user yet. skip", user);
      return;
    }
    if (!user.user && !publicPaths.includes(path)) {
      // console.log(
      //   "*Auth: REDIRECT! Private URL:",
      //   path,
      //   "and user false=",
      //   user
      // );
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
      console.log(
        "*Auth ALLOW! due to public URL:",
        path,
        " or user logged in=",
        user
      );
    }
    // }
  }
  // return authorized && children;
  return authorized && children;
}
