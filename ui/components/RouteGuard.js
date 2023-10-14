import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "contexts/UserContext";

export function RouteGuard({ children }) {
  const { user } = useUserContext();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    // console.log(router.asPath);
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
    // Add publicPaths to allow anonymous visits
    const publicPaths = ["/", "/login", "/logout", "/store", "/insurance"];
    const path = url.split("?")[0];
    // console.log(url);
    if (user.prerender) {
      return;
    }
    if (!user.user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: url },
      });
    } else {
      setAuthorized(true);
    }
  }
  return authorized && children;
}
