import type { Request, Response } from "express";
import { Router } from "express";
import LivroController from "./controller/LivroController.js";
import AlunoController from "./controller/AlunoController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem vindo" });
});

/**
 * Endpoints (rotas) para Aluno
 */
// Retorna a lista com todos os alunos
router.get("/api/aluno", AlunoController.todos);
// Insere um novo aluno no banco
router.post("/api/aluno", AlunoController.novo);

/**
 * Endpoints (rotas) para Livro
 */
// Retorna a lista com todos os livros
router.get("/api/livro", LivroController.todos);
// Insere um novo livro no banco
router.post("/api/livro", LivroController.novo);

/**
 * Endpoints (rotas) para Emprestimo
 */
// Retorna a lista com todos os emprestimos cadastrados
router.get("/api/emprestimo", EmprestimoController.todos);

router.post("/api/emprestimo", EmprestimoController.cadastrar);

export { router };