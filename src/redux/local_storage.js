const storage = {
  store: (key, value) => {
    try {
      if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  },
  get: (key) => {
    try {
      if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
    }
  },
  delete: (key) => {
    try {
      if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  },
  clear: () => {
    try {
      if (typeof window !== 'undefined') {
      localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export { storage };
