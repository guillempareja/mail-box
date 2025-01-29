const { response } = require('express');
const { loginMock } = require('../mocks/login');
const { refreshTokenMock } = require('../mocks/refresh-token');
const { testMock } = require('../mocks/test');

const login = async (req, res = response) => {
  await delay();
  res.json(loginMock);
  // res.status(401).json();
};

const refreshToken = async (req, res = response) => {
  await delay();
  res.json(refreshTokenMock);
};

const test = async (req, res = response) => {
  const authHeader = req.headers['authorization'];

  // Check if token exists and is valid
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== 'tokenUsuario3') {
    return res.status(401).json();
  }

  await delay();
  res.json(testMock);
};

module.exports = {
  login,
  refreshToken,
  test
}

const delay = async (time = 100) => await new Promise(resolve => setTimeout(resolve, time));
