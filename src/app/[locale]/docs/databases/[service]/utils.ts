type Tables = Array<{
  name: string;
  fields: Array<string>;
  fks: Array<string>;
  m2ms: Array<string>;
}>;

export const DATABASES: { [key: string]: Tables } = {
  "user-service": [
    {
      name: "User",
      fields: [
        "id",
        "public_id",
        "email",
        "password_hash",
        "is_verified (checked email)",
        "date_joined",
        "name",
        "surname",
        "age",
        "gender",
        "date_deleted (asked to delete account, default: null)",
      ],
      fks: [],
      m2ms: [],
    },
    {
      name: "Verification Code",
      fields: [
        "id",
        "user_id",
        "code (6 chars)",
        "purpose (enum: EMAIL, BACKUP_EMAIL, PASSWORD)",
        "expires_at",
      ],
      fks: ["user_id -> User.id"],
      m2ms: [],
    },
    {
      name: "Chain",
      fields: ["id", "user_id", "remember_me"],
      fks: ["user_id -> User.id"],
      m2ms: [],
    },
    {
      name: "Refresh Token",
      fields: [
        "jti (primary key)",
        "created_at",
        "expires_at",
        "chain_id",
        "is_revoked (for forced logout)",
      ],
      fks: ["chain_id -> Chain.id"],
      m2ms: [],
    },
  ],
  "parser-service": [
    {
      name: "Provider",
      fields: ["id", "slug", "name", "url"],
      fks: [],
      m2ms: [],
    },
    {
      name: "Category",
      fields: ["id", "slug", "name_ru", "name_ro"],
      fks: [],
      m2ms: ["events"],
    },
    {
      name: "Event",
      fields: [
        "id",
        "slug",
        "provider_id",
        "external_id",
        "url",
        "title_ru",
        "title_ro",
        "description_ru",
        "description_ro",
        "date_start",
        "date_end",
        "address",
        "place",
        "city",
        "price_from",
        "price_to",
        "image_url",
        "tickets_url",
        "created_at (the day parsed)",
      ],
      fks: ["provider_id -> Provider.id"],
      m2ms: ["categories"],
    },
    {
      name: "EventCategory",
      fields: ["id", "event_id", "category_id"],
      fks: ["event_id -> Event.id", "category_id -> Category.id"],
      m2ms: [],
    },
  ],
  "recommendations-service": [
    {
      name: "User",
      fields: [
        "id",
        "public_id",
        "preferences (comma separated list of event categories slugs)",
      ],
      fks: [],
      m2ms: ["cached_events"],
    },
    {
      name: "CachedEvent",
      fields: ["id", "event_id", "event_slug", "date_end"],
      fks: [],
      m2ms: ["users"],
    },
    {
      name: "Recommendation",
      fields: ["id", "cached_event_id", "user_id", "is_new"],
      fks: ["cached_event_id -> CachedEvent.id", "user_id -> User.id"],
      m2ms: [],
    },
  ],
  "tg-service": [
    {
      name: "User",
      fields: ["id", "public_id", "username (tg)"],
      fks: [],
      m2ms: [],
    },
    {
      name: "Verification Code",
      fields: ["id", "code (6 chars)", "username (tg)", "expires_at"],
      fks: [],
      m2ms: [],
    },
  ],
};
