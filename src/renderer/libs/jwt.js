import jwt from 'jsonwebtoken';

export function createJwtToken(data = {}, secret, expiresIn) {
  return new Promise((resolve) => {
    const token = jwt.sign(data, secret, { expiresIn });
    resolve(token);
  });
}

export function verifyJwtToken(token, secret) {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => resolve(decoded));
  });
}