import type { Request, Response } from "express";
import Emprestimo from "../model/Emprestimo.js";
import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";

/**
 * Classe responsável por receber a requisição do cliente, processar essa requisição e devolver a resposta ao cliente
 * 
 * Trata apenas de requisições relacionadas ao recurso Emprestimo
 */
class EmprestimoController extends Emprestimo {

    /**
     * Faz a chamada ao modelo para obter a lista de emprestimos e devolve ao cliente
     * 
     * @param req Requisição do cliente
     * @param res Resposta do servidor
     * @returns (200) Lista de todos os pedidos
     * @returns (500) Erro na consulta
     */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarEmprestimo da classe Emprestimo para buscar os emprestimos no banco de dados
            // Se o método retornar null ou undefined, usa um array vazio como valor padrão
            const listaEmprestimo: Array<EmprestimoDTO> = await Emprestimo.listarEmprestimo() ?? [];

            // Retorna uma resposta HTTP com status 200 (OK)
            // Envia a lista de emprestimo em formato JSON para o cliente
            return res.status(200).json(listaEmprestimo);
        } catch (error) {
            // Em caso de erro na execução do método, exibe uma mensagem de erro no console
            console.error(`Erro ao consultar modelo. ${error}`);

            // Retorna uma resposta HTTP com status 500 (Internal Server Error)
            // Envia uma mensagem informando que não foi possível acessar os dados
            return res.status(500).json({ mensagem: "Não foi possível acessar a lista de empréstimos." });
        }
    }

}

export default EmprestimoController;