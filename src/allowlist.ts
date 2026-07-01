export function isAllowed<T>(userId: T | undefined, allowedUserIds: T[]): boolean {
  return userId !== undefined && allowedUserIds.length > 0 && allowedUserIds.includes(userId);
}

/**
 * Whether a user may DM the bot. When `dmAllowedUserIds` is empty the DM
 * channel is unrestricted (any allowed user may DM — the default). When it is
 * non-empty, only the listed users may DM; everyone else is limited to groups.
 */
export function isDmAllowed<T>(userId: T | undefined, dmAllowedUserIds: T[]): boolean {
  if (dmAllowedUserIds.length === 0) return true;
  return userId !== undefined && dmAllowedUserIds.includes(userId);
}
