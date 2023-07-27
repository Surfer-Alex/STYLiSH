const router = async () => {
  const routes = [
    { path: "" },
    { path: "?category=women" },
    { path: "?category=men" },
    { path: "?category=accessories" },
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.search === route.path,
    };
  });
  potentialMatches.find((potentialMatch) => potentialMatch.isMatch);
};

export { router };
