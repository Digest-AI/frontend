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
    ],
  },
  "recommendations-service": {
    requests: [
      {
        who: "parser-service",
        what: "All events parsed on today",
      },
      {
        who: "tg-service",
        what: "All new recommendations",
      },
    ],
    responds: [
      {
        whom: "frontend",
        what: "CRUD on user, Readonly on recommendations",
      },
    ],
  },
  "tg-service": {
    requests: [],
    responds: [
      {
        whom: "frontend",
        what: "CRUD on user, verification code",
      },
      {
        whom: "recommendations-service",
        what: "All recommendations sent to telegram (transfers recommendations)",
      },
    ],
  },
};
