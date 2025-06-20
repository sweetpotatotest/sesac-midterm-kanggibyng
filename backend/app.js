
const express = require("express");
//const errorHandling = require('./middleware/error-handling-middleware');
const app = express();
const PORT = 4000;
const prisma = require('./utils/prisma');
const bycrpt = require('bycrpt');
const token = require('./utils/jwt');

app.use(express.json());




app.use('/POST /auth/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  //이메일 중복검사
  const user = await prisma.users.findFirst({
    where: { email }
  })
  if (user) {
    return res.status(409).send({
      errorMessage: "이메일 중복",
    });
  }

  const saltRounds = 10;
  const salt = await bycrpt.genSalt(saltRounds);
  const bycrptPassword = await bycrpt.hash(
    password,
    salt
  );

  await prisma.users.create({
    data: {
      email,
      password: bycrptPassword,
      username
    }
  })

  return res.status(201).json({
    message: "회원가입 완료",
    userId: username
  })
});

app.use('POST /auth/login', async (req, res, next) => {
  const { email, password } = req.body;

  //이메일 체크
  const user = await prisma.users.findFirst({
    where: { email }
  })
  if (!user) {
    return res.status(401).send({
      errorMessage: "로그인 실패",
    });
  }

  //비밀번호 체크
  const checkBycrpt = await bycrpt.compare(password, user.password);
  if (!checkBycrpt) {
    return res.status(401).send({
      errorMessage: "로그인 실패",
    });
  }


  //토큰발급
  const newtoken = token.generateTokens(user.user_id);
  return res.status(200).send({
    "accessToken": newtoken
  })


});
app.use('POST /todos', async (req, res, next) => {
  const { title, description } = req.body;

  await prisma.todos.create({
    data: {
      title,
      description,
      user_id
    }
  })

  return res.status(201).json({
    "todoId": "글쓰기 완료"
  })
});

app.use('GET /todos', async (req, res, next) => {
  const todos = await prisma.todos.findMany({
    include: {
      users: {
        select: {
          email: true,
          password: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });


  return res.status(201).json({
    message: "로딩 완료",
    data: todos
  })

});



app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
