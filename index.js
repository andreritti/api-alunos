import express, { response } from "express";
const server = express();
const port = 3000

server.use(express.json());

let alunos = [
  {
    "id": 1,
    "nome": "Ana",
    "idade": "15",
    "curso": "Inglês"
  },{
    "id": 2,
    "nome": "Carlos",
    "idade": "19",
    "curso": "Filosofia"
  },{
    "id": 3,
    "nome": "Jefersao",
    "idade": "87",
    "curso": "Pescaria"}
];

let ultimoId = alunos.length;

server.get("/alunos", (req, res) => {
  res.json(alunos);
})

server.post("/alunos", (req, res)=> {
  console.log("Cadastrando novo aluno: ", req.body);
  ultimoId++
  req.body.id = ultimoId;
  alunos.push(req.body)
  res.sendStatus(201);
})

server.get("/alunos/:id", (req, res)=> {
  const indexAluno = alunos.findIndex(aluno => aluno.id === Number(req.params.id));

  if (indexAluno == -1) {
    res.sendStatus(404);
  }
  else {
    res.json(alunos[indexAluno]);
  }
})

server.patch("/alunos/:id", (req, res) => {
  const indexAluno = alunos.findIndex(aluno => aluno.id === Number(req.params.id));

if (indexAluno == -1) {
  res.sendStatus(404);
} else {

    req.body.id = alunos[indexAluno].id;

    alunos[indexAluno] = req.body;
    res.json(alunos[indexAluno]);
  }
})

server.delete("/alunos/:id", (req, res) => {
  const indexAluno = alunos.findIndex(aluno => aluno.id === Number(req.params.id));
  if (indexAluno == -1) {
    res.sendStatus(404);
} else {
  alunos.splice(indexAluno, 1);
  res.sendStatus(200);
}
})

server.listen(port, () => console.log("Meu servidor está funcionando na port:", port));