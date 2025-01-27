const { response } = require('express');
const { loginMock } = require('../mocks/login');
const { refreshTokenMock } = require('../mocks/refresh-token');

const login = async (req, res = response) => {
  await delay();
  res.json(loginMock);
  // res.status(401).json();
};

const refreshToken = async (req, res = response) => {
  await delay();
  res.json(refreshTokenMock);
};

module.exports = {
  login,
  refreshToken,
}

const delay = async () => await new Promise(resolve => setTimeout(resolve, 100));
