const { response } = require('express');
const { loginMock } = require('../mocks/login');
const { searchMock } = require('../mocks/search');
const { mappingMock } = require('../mocks/mapping');
const { similarConsultationsMock } = require('../mocks/similar-consultations');

const login = async (req, res = response) => {
  await delay();
  res.json(loginMock);
  // res.status(401).json();
};

const search = async (req, res = response) => {
  await delay();
  res.json(searchMock);
};

const similarConsultations = async (req, res = response) => {
  await delay();
  res.json(similarConsultationsMock);
};

const summaryFeedback = async (req, res = response) => {
  res.json();
};

const finalizeWithoutAnswering = async (req, res = response) => {
  await delay();
  res.json();
};

const markAsNotSpam = async (req, res = response) => {
  await delay();
  res.json();
};

const redirect = async (req, res = response) => {
  await delay();
  res.json();
};

const answer = async (req, res = response) => {
  await delay();
  res.json();
};

const mapping = (req, res = response) => {
  res.json(mappingMock);
};

module.exports = {
  login,
  search,
  mapping,
  summaryFeedback,
  finalizeWithoutAnswering,
  redirect,
  similarConsultations,
  answer,
  markAsNotSpam
}

const delay = async () => await new Promise(resolve => setTimeout(resolve, 100));
