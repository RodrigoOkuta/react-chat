import axios from './index';

export const Get = path => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${path}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const Post = (path, values) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${path}`, values)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// export const Patch = (path, values) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .patch(`${path}`, values)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

// export const Delete = (path: string): any => {
//   return new Promise((resolve, reject) => {
//     axios
//       .delete(`${path}`)
//       .then(response => {
//         resolve(response);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };
