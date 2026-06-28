async function teacherLogin(request, email, password) {
  const response = await request.post(
    "http://localhost:5000/api/auth/teacher/login",
    {
      data: {
        email,
        password,
      },
    }
  );

  return response;
}

module.exports = {
  teacherLogin,
};