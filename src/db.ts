const makeDb = () => {
  return {
    async getAccessToken({}: { userId: string }) {
      return process.env.VESSEL_ACCESS_TOKEN;
    },
  };
};

const db = makeDb();
export default db;
