async function createSubject(request, token, subject) {
  return await request.post(
    "http://localhost:5000/api/subjects",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: subject,
    }
  );
}

async function getSubjects(request, token) {
  return await request.get(
    "http://localhost:5000/api/subjects",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

async function deleteSubject(request, token, id) {
  return await request.delete(
    `http://localhost:5000/api/subjects/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

module.exports = {
  createSubject,
  getSubjects,
  deleteSubject,
};