const getUsers = async () => {
  const response = await fetch('http://localhost:3500/users');
  return response.json();
};

export default getUsers;
