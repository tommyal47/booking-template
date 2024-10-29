// src/composables/usePolicy.js

import policies from "@/policies/policies";
export function usePolicy() {
  const can = (role, resource, action) => {
    return policies.can(role, resource, action);
  };

  return { can };
}
