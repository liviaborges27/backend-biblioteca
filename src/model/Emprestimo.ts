import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DatabaseModel().pool;  //Inicializa o pool de conexões com o banco de dados
class Emprestimo {
    //atributos
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;


    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string
    ) {
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
                    emprestimoBD.idAluno,
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
    /**
    * Cadastra um novo empréstimo 
    * 
    * @param idAluno : number
    * @param idLivro : number
    * @param dataEmprestimo : Date
    * @param dataDevolucao : Date
    * @param statusEmprestimo : string
    * @returns 
    */
    static async cadastrarEmprestimo(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: string
    ): Promise<boolean> {
        try {
            // Cria a consulta (query) para inserir um empréstimo na tabela retornando o ID do empréstimo criado
            const queryInsertEmprestimo = `
                INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
                VALUES ($1, $2, $3, $4, $5) RETURNING id_emprestimo;
            `;

            // estrutura os valores recebidos pela função em uma lista (array)
            const valores = [idAluno, idLivro, dataEmprestimo, dataDevolucao, statusEmprestimo];
            // realizada a consulta no banco de dados e armazena o resultado
            const resultado = await database.query(queryInsertEmprestimo, valores);

            // verifica se a quantidade de linhas alteradas é diferente de 0
            if (resultado.rowCount != 0) {
                // exibe mensagem de sucesso no console
                console.log(`Empréstimo cadastrado com sucesso! ID: ${resultado.rows[0].id_emprestimo}`);
                // retorna o ID do empréstimo
                return resultado.rows[0].id_emprestimo;
            }

            // retorna falso
            return false;

            // captura qualquer tipo de erro que possa acontecer
        } catch (error) {
            // exibe o detalhe do erro no console
            console.error(`Erro ao cadastrar empréstimo: ${error}`);
            // lança um novo erro
            throw new Error('Erro ao cadastrar o empréstimo.');
        }
    }
}

export default Emprestimo;