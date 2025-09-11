import fs from 'fs';

export function readFile(filename: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
