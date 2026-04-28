type Workflow = {
  requests: Array<{
    who: string;
    what: string;
  }>;
  responds: Array<{
    whom: string;
    what: string;
  }>;
};

export const WORKFLOWS: { [key: string]: Workflow } = {
  "user-service": {
    requests: [],
    responds: [
      {
        whom: "frontend",
        what: "CRUD on user, verifies using email, refreshes tokens, logins / signups user",
      },
    ],
  },
  "parser-service": {
    requests: [],
    responds: [
      {
        whom: "frontend",
        what: "READONLY! All providers, all categories, sorted, filtered, paginated events",
      },
      {
        whom: "recommendations-service",
        what: "All events parsed on specific-date",
      },
      {
        whom: "tg-service",
        what: "All events parsed on date-range",
      },
    ],
  },
  "recommendations-service": {
    requests: [
      {
        who: "parser-service",
        what: "All events parsed on today",
      },
    ],
    responds: [
      {
        whom: "frontend",
        what: "CRUD on user, Readonly on recommendations",
      },
      {
        whom: "tg-service",
        what: "All new recommendations",
      },
    ],
  },
  "tg-service": {
    requests: [
      {
        who: "parser-service",
        what: "All new recommendations",
      },
      {
        who: "recommendations-service",
        what: "All new recommendations",
      },
    ],
    responds: [
      {
        whom: "frontend",
        what: "CRUD on user, verification code",
      },
    ],
  },
};
