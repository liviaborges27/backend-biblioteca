import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js"; 
import { DatabaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DatabaseModel().pool;  //Inicializa o pool de conexões com o banco de dados
class Emprestimo {
    //atributos
    private idEmprestimo: number;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;


    constructor(
        _idEmprestimo: number,
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string
    ) {
        this.idEmprestimo = _idEmprestimo;
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmprestimo;
        this.dataDevolucao = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo;

    }
    //Metodo GET e SET (encapsulamento)
    // Métodos GET e SET
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }
    public setIdEmprestimo(_idEmprestimo: number): void {
        this.idEmprestimo = _idEmprestimo;
    }

    public getIdAluno(): number {
        return this.idAluno;
    }
    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }

    public getIdLivro(): number {
        return this.idLivro;
    }
    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }
    public setDataEmprestimo(_dataEmprestimo: Date): void {
        this.dataEmprestimo = _dataEmprestimo;
    }

    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }
    public setDataDevolucao(_dataDevolucao: Date): void {
        this.dataDevolucao = _dataDevolucao;
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }
    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo;
    }
    /**
     * Retorna os pedidos de venda cadastrados no banco de dados
     * @returns Lista com pedidos de venda cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarEmprestimo(): Promise<Array<EmprestimoDTO> | null> {
        try {
            // Inicializa uma lista vazia que irá armazenar os objetos do tipo EmprestimoDTO
            let listaDeEmprestimo: Array<EmprestimoDTO> = [];

           
            const querySelectEmprestimo = `SELECT * FROM emprestimo;`;

            // Executa a query no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectEmprestimo);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((emprestimoBD) => {
                const novoEmprestimo: Emprestimo = new Emprestimo(
                    emprestimoBD.idEmprestimo,
                    emprestimoBD.id_aluno,
                    emprestimoBD.idLivro,
                    emprestimoBD.dataEmprestimo,
                    emprestimoBD.dataDevolucao,
                    emprestimoBD.statusEmprestimo
                );
                novoEmprestimo.setIdEmprestimo(emprestimoBD.idEmprestimo);
                // Adiciona o objeto DTO à lista de emprestimo
                listaDeEmprestimo.push(emprestimoBD);
            });

            // Retorna a lista completa de emprestimo
            return listaDeEmprestimo;
        } catch (error) {
            // Em caso de erro na execução da query, exibe uma mensagem de erro no console
            console.error(`Erro na consulta com o banco de dados.`, error);

            // Retorna null indicando que houve uma falha na operação
            return null;
        }
    }
}

export default Emprestimo;