export interface SavedConversion {
  fromId: string;
  toId: string;
  categoryId: string;
  timestamp?: number;
}

const RECENT_KEY = 'unitflow_recent_conversions';
const FAVORITES_KEY = 'unitflow_favorite_conversions';

export function getRecentConversions(): SavedConversion[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentConversion(conv: SavedConversion): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getRecentConversions();
    // remove duplicate if existing
    const filtered = current.filter(
      c => !(c.fromId === conv.fromId && c.toId === conv.toId)
    );
    const updated = [{ ...conv, timestamp: Date.now() }, ...filtered].slice(0, 10);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}

export function getFavoriteConversions(): SavedConversion[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteConversion(conv: SavedConversion): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getFavoriteConversions();
    const exists = current.some(
      c => c.fromId === conv.fromId && c.toId === conv.toId
    );
    let updated: SavedConversion[];
    let isFav = false;
    if (exists) {
      updated = current.filter(
        c => !(c.fromId === conv.fromId && c.toId === conv.toId)
      );
      isFav = false;
    } else {
      updated = [{ ...conv, timestamp: Date.now() }, ...current].slice(0, 20);
      isFav = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return isFav;
  } catch {
    return false;
  }
}

export function isFavoriteConversion(fromId: string, toId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getFavoriteConversions();
    return current.some(c => c.fromId === fromId && c.toId === toId);
  } catch {
    return false;
  }
}
