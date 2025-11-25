import type { LivroDTO } from "../interface/LivroDTO.js";
import { DatabaseModel } from "./DataBaseModel.js";
const database = new DatabaseModel().pool;
class Livro {
    // Atributos
    private idLivro: number = 0;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private quantTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestado: string;

    // Construtor
    constructor(
        _titulo: string,
        _autor: string,
        _editora: string,
        _anoPublicacao: string,
        _isbn: string,
        _quantTotal: number,
        _quantDisponivel: number,
        _valorAquisicao: number,
        _statusLivroEmprestado: string
    ) {
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora = _editora;
        this.anoPublicacao = _anoPublicacao;
        this.isbn = _isbn;
        this.quantTotal = _quantTotal;
        this.quantDisponivel = _quantDisponivel;
        this.valorAquisicao = _valorAquisicao;
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }

    // Métodos GET e SET
    public getIdLivro(): number {
        return this.idLivro;
    }
    public setIdLivro(_idLivro: number): void {
        this.idLivro = _idLivro;
    }

    public getTitulo(): string {
        return this.titulo;
    }
    public setTitulo(_titulo: string): void {
        this.titulo = _titulo;
    }

    public getAutor(): string {
        return this.autor;
    }
    public setAutor(_autor: string): void {
        this.autor = _autor;
    }

    public getEditora(): string {
        return this.editora;
    }
    public setEditora(_editora: string): void {
        this.editora = _editora;
    }

    public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }
    public setAnoPublicacao(_anoPublicacao: string): void {
        this.anoPublicacao = _anoPublicacao;
    }

    public getIsbn(): string {
        return this.isbn;
    }
    public setIsbn(_isbn: string): void {
        this.isbn = _isbn;
    }

    public getQuantTotal(): number {
        return this.quantTotal;
    }
    public setQuantTotal(_quantTotal: number): void {
        this.quantTotal = _quantTotal;
    }

    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }
    public setQuantDisponivel(_quantDisponivel: number): void {
        this.quantDisponivel = _quantDisponivel;
    }

    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }
    public setValorAquisicao(_valorAquisicao: number): void {
        this.valorAquisicao = _valorAquisicao;
    }

    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }
    public setStatusLivroEmprestado(_statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }
    /**
    * Retorna os livroscadastrados no banco de dados
    * @returns Lista com carros cadastrados
    * @returns valor nulo em caso de erro na consulta
    */
    static async listarLivro(): Promise<Array<Livro> | null> {
        try {
            // Inicializa uma lista vazia que irá armazenar os objetos do tipo LivroDTO
            let listaDeLivro: Array<Livro> = [];

            // Define a query SQL que será executada no banco de dados para buscar todos os registros da tabela 'livro'
            const querySelectLivro = `SELECT * FROM livro;`;

            // Executa a query no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectLivro);

            // Itera sobre cada linha retornada pela consulta
            respostaBD.rows.forEach((livroBD) => {
                // Cria um novo objeto CarroDTO com os dados da linha atual
                const novoLivro: Livro = new Livro(
                    livroBD.titulo,
                    livroBD.autor,
                    livroBD.editora,
                    livroBD.anoPublicacao,
                    livroBD.isbn,
                    livroBD.quantTotal,
                    livroBD.quantDisponivel,
                    livroBD.valorAquisicao,
                    livroBD.statusLivroEmprestado

                )

                novoLivro.setIdLivro(livroBD.id_livro);
                // Adiciona o novo objeto LivroDTO à lista de livro
                listaDeLivro.push(novoLivro);
            });

            // Retorna a lista completa de carros
            return listaDeLivro;
        } catch (error) {
            // Em caso de erro na execução da query, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
    /**
    * Insere um livro no banco de dados
    * 
    * @param livro objeto a ser inserido no banco
    * @returns **true** caso a inserção tenha sido feita, **false** em caso de erro
    */
    static async cadastrarLivro(livro: LivroDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo livro a tabela 'livro'
            // Os valores serão passados como parâmetros ($1, $2, $3, $4..)
            // O comando RETURNING retorna o id_livro gerado automaticamente pelo banco
            const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora , ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                                VALUES
                                ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                RETURNING id_livro;`;

            // Executa a query no banco de dados, passando os valores do carro como parâmetros
            // Usa toUpperCase() para padronizar os textos e parseInt() para garantir que o ano seja um número
            const respostaBD = await database.query(queryInsertLivro, [
                livro.titulo.toUpperCase(),
                livro.autor.toUpperCase(),
                livro.editora.toUpperCase(),
                livro.anoPublicacao,
                livro.isbn,
                livro.quantDisponivel,
                livro.quantTotal,
                livro.valorAquisicao,
                livro.statusLivroEmprestado

            ]);

            // Verifica se a resposta do banco contém pelo menos uma linha (ou seja, se o carro foi inserido)
            if (respostaBD.rows.length > 0) {
                // Exibe no console uma mensagem de sucesso com o ID do carro cadastrado
                console.info(`Livro cadastrado com sucesso. ID: ${respostaBD.rows[0].id_carro}`);

                // Retorna true indicando que o cadastro foi realizado com sucesso
                return true;
            }

            // Se nenhuma linha foi retornada, significa que o cadastro falhou
            // Retorna false indicando falha na operação
            return false;
        } catch (error) {
            // Em caso de erro na execução da query, exibe uma mensagem de erro no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna false indicando que houve uma falha na operação
            return false;
        }
    }

}

export default Livro;