/**
 * Storage utility that mimics the window.storage API from the original code
 * but uses localStorage for persistence in a static web app.
 */

const PREFIX = 'training-manager:';

export const storage = {
  async list(prefix: string): Promise<{ keys: string[] }> {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX + prefix)) {
        keys.push(key.replace(PREFIX, ''));
      }
    }
    return { keys };
  },

  async get(key: string): Promise<{ value: string } | null> {
    const value = localStorage.getItem(PREFIX + key);
    if (value === null) return null;
    return { value };
  },

  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(PREFIX + key, value);
  },

  async delete(key: string, _cascade?: boolean): Promise<void> {
    localStorage.removeItem(PREFIX + key);
  },
};
