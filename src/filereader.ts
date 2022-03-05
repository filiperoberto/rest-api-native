import fs from "fs";

export const readFile = (path: string, encoding: string) => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    return fs.readFile(path, encoding, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

export const writeFile = (path: string, data: object) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      // Check out any errors
      if (err) {
        return reject(err);
      }
      //@ts-ignore
      resolve();
    });
  });
};
