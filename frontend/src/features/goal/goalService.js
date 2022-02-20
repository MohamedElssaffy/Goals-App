import axios from 'axios';

const API_URL = '/api/goals/';

const create = async (goalData, token) => {
  const res = await axios.post(API_URL, goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.data) {
    return res.data;
  }
};

const fetchGoals = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

const deleteGoal = async (goalId, token) => {
  const res = await axios.delete(API_URL + goalId, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

const goalService = {
  create,
  fetchGoals,
  deleteGoal,
};

export default goalService;
