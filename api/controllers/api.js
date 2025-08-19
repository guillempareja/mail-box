const { response } = require('express');
const { loginMock } = require('../mocks/login');
const { refreshTokenMock } = require('../mocks/refresh-token');
const { testMock } = require('../mocks/test');

const test = async (req, res = response) => {
  const authHeader = req.headers['authorization'];

  // Check if token exists and is valid
  if (
    !authHeader ||
    !authHeader.startsWith('Bearer ') ||
    authHeader.split(' ')[1] !== 'tokenUsuario3'
  ) {
    return res.status(401).json();
  }

  //  Expose and set backend warning header
  res.setHeader('Access-Control-Expose-Headers', 'Back-Custom-Warning-Message');
  res.setHeader('Back-Custom-Warning-Message', 'customWarning');

  // Prevent browser caching this response
  res.setHeader('Cache-Control', 'no-store');

  await delay();
  res.json(testMock);
};

const emptyResponse = async (req, res = response) => {
  await delay();
  res.json();
};

const errorResponse = (req, res = response) => {
  res.status(500).json();
};

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
  test,
  emptyResponse,
  errorResponse,
  login,
  refreshToken,
};

const delay = async (time = 100) =>
  await new Promise((resolve) => setTimeout(resolve, time));
