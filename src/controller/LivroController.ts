import type { LivroDTO } from "../interface/LivroDTO.js";
import Livro from "../model/Livro.js";
import type { Request, Response } from "express";

class LivroController extends Livro {

    /**
     * 
     * 
     * @param req Requisição do aluno
     * @param res Resposta do servidor
     * @returns 
     * @returns 
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarLivro da classe Livro para buscar todos os livros no banco de dados
            const listarLivro: Array<Livro> | null = await Livro.listarLivro();

            // Retorna uma resposta HTTP com status 200 (OK) e envia a lista de livros em formato JSON
            return res.status(200).json(listarLivro);
        } catch (error) {
            // Em caso de erro, exibe a mensagem no console para ajudar na depuração
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (erro interno do servidor)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possivel acessar a lista de livros." });
        }
    }

    //Chama o  modelo para obter o livro selecionado e devolve ao aluno
    /**
     * F
     * @param req 
     * @param res 
     * @returns
     * @returns 
     * @returns 
     */

    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // Extrai os dados enviados pelo aluno na requisição HTTP (normalmente via POST)
            // Esses dados devem estar no corpo da requisição e seguir o formato da interface LivroDTO
            const dadosRecebidosLivro = req.body;

            // validação de dados ...

            // Chama o método cadastrarLivro da classe Livro, passando os dados recebidos
            // Esse método deve inserir o livro no banco de dados e retornar true ou false
            const respostaModelo = await Livro.cadastrarLivro(dadosRecebidosLivro);

            // Verifica se o cadastro foi bem-sucedido
            if (respostaModelo) {
                // Se sim, retorna uma resposta HTTP com status 201 (Created)
                // Envia uma mensagem informando que o lirvo foi cadastrado com sucesso
                return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
            } else {
                // Se não, retorna uma resposta HTTP com status 400 (Bad Request)
                // Envia uma mensagem informando que houve erro no cadastro
                return res.status(400).json({ mensagem: "Erro ao cadastrar livro." });
            }
        } catch (error) {
            // Em caso de erro inesperado (como falha de conexão ou erro interno), exibe a mensagem no console
            console.error(`Erro no modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível inserir o novo livro
            return res.status(500).json({ mensagem: "Não foi possível inserir o livro" });
        }

    }
}
export default LivroController;