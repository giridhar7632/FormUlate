// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "forms",
    columns: [
      { name: "page", type: "json", notNull: true, defaultValue: "{}" },
      { name: "name", type: "string" },
      { name: "slug", type: "string", unique: true },
      { name: "createdBy", type: "link", link: { table: "nextauth_users" } },
    ],
  },
  {
    name: "nextauth_users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "string" },
    ],
    revLinks: [
      { column: "createdBy", table: "forms" },
      { column: "user", table: "nextauth_accounts" },
      { column: "user", table: "nextauth_users_accounts" },
      { column: "user", table: "nextauth_users_sessions" },
      { column: "user", table: "nextauth_sessions" },
    ],
  },
  {
    name: "nextauth_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "string" },
      { name: "access_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
    revLinks: [{ column: "account", table: "nextauth_users_accounts" }],
  },
  {
    name: "nextauth_verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "nextauth_users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "account", type: "link", link: { table: "nextauth_accounts" } },
    ],
  },
  {
    name: "nextauth_users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "session", type: "link", link: { table: "nextauth_sessions" } },
    ],
  },
  {
    name: "nextauth_sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
    ],
    revLinks: [{ column: "session", table: "nextauth_users_sessions" }],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Forms = InferredTypes["forms"];
export type FormsRecord = Forms & XataRecord;

export type NextauthUsers = InferredTypes["nextauth_users"];
export type NextauthUsersRecord = NextauthUsers & XataRecord;

export type NextauthAccounts = InferredTypes["nextauth_accounts"];
export type NextauthAccountsRecord = NextauthAccounts & XataRecord;

export type NextauthVerificationTokens =
  InferredTypes["nextauth_verificationTokens"];
export type NextauthVerificationTokensRecord = NextauthVerificationTokens &
  XataRecord;

export type NextauthUsersAccounts = InferredTypes["nextauth_users_accounts"];
export type NextauthUsersAccountsRecord = NextauthUsersAccounts & XataRecord;

export type NextauthUsersSessions = InferredTypes["nextauth_users_sessions"];
export type NextauthUsersSessionsRecord = NextauthUsersSessions & XataRecord;

export type NextauthSessions = InferredTypes["nextauth_sessions"];
export type NextauthSessionsRecord = NextauthSessions & XataRecord;

export type DatabaseSchema = {
  forms: FormsRecord;
  nextauth_users: NextauthUsersRecord;
  nextauth_accounts: NextauthAccountsRecord;
  nextauth_verificationTokens: NextauthVerificationTokensRecord;
  nextauth_users_accounts: NextauthUsersAccountsRecord;
  nextauth_users_sessions: NextauthUsersSessionsRecord;
  nextauth_sessions: NextauthSessionsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Giridhar-s-workspace-bc9633.us-east-1.xata.sh/db/formulate",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
