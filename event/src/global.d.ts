import { UserIdentity as OriginalUserIdentity } from "convex/server";

const some: OriginalUserIdentity;

declare module "convex/server" {
  interface UserIdentity extends OriginalUserIdentity {
    id: string;
  }
}

