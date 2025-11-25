import type { AlunoDTO } from "../interface/AlunoDTO.js"; // Importa a interface do DTO
import { DatabaseModel } from "./DataBaseModel.js"; // Importa a classe DatabaseModel para realizar a conexão com o banco de dados

const database = new DatabaseModel().pool; //Inicializa o pool de conexões com o banco de dados

class Aluno {
    //atributos
    private idAluno: number = 0;
    private ra: string;
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;

    constructor(
        _ra: string,
        _nome: string,
        _sobrenome: string,
        _dataNascimento: Date,
        _endereco: string,
        _email: string,
        _celular: string
    ) {
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.endereco = _endereco;
        this.email = _email;
        this.celular = _celular;

    }
    //Metodo GET e SET (encapsulamento)
    public getIdAluno(): number {
        return this.idAluno
    }

    public setIdAluno(_idAluno: number): void {
        this.idAluno = _idAluno;
    }
    public getRa(): string {
        return this.ra
    }

    public setRa(_ra: string): void {
        this.ra = _ra;
    }
    public getNome(): string {
        return this.nome;
    }
    public setNome(_nome: string): void {
        this.nome = _nome;
    }
    public getSobrenome(): string {
        return this.sobrenome;
    }
    public setSobrenome(_sobrenome: string): void {
        this.sobrenome = _sobrenome;
    }
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }
    public setDataNasciemnto(_dataNasciemento: Date): void {
        this.dataNascimento = _dataNasciemento;
    }
    public getEndereco(): string {
        return this.endereco;
    }
    public setEndereco(_endereco: string): void {
        this.endereco = _endereco;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(_email: string): void {
        this.email = _email;
    }
    public getCelular(): string {
        return this.celular;
    }
    public setCelular(_celular: string): void {
        this.celular = _celular;
    }
    /**
     * Insere um aluno no banco de dados
     * 
     * @param aluno objeto a ser inserido no banco
     * @returns **true** caso a inserção tenha sido feita, **false** em caso de erro
     */
    static async cadastrarAluno(aluno: AlunoDTO): Promise<boolean> {
        try {
            // Define a query SQL para inserir um novo aluno na tabela 'aluno'
            // Os valores serão passados como parâmetros ($1, $2, $3)
            // O comando RETURNING retorna o id_aluno gerado automaticamente pelo banco
            const queryInsertAluno = `INSERT INTO aluno (nome, ra, sobrenome, data_nascimento, endereco, email, celular)
                                VALUES
                                ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING id_aluno;`;

            // Executa a query no banco de dados, passando os dados do caluno como parâmetros
            // Usa toUpperCase() para padronizar o nome em letras maiúsculas
            const respostaBD = await database.query(queryInsertAluno, [
                aluno.nome.toUpperCase(),
                aluno.ra,
                aluno.sobrenome.toUpperCase(),
                aluno.dataNascimento,
                aluno.endereco.toUpperCase(),
                aluno.email.toUpperCase(),
                aluno.celular
            ]);

            // Verifica se a resposta do banco contém pelo menos uma linha
            // Isso indica que o aluno foi inserido com sucesso
            if (respostaBD.rows.length > 0) {
                // Exibe no console uma mensagem de sucesso com o ID do aluno cadastrado
                console.info(`Aluno cadastrado com sucesso. ID: ${respostaBD.rows[0].id_aluno}`);

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
    /**
     * Retorna os alunos cadastrados no banco de dados
     * @returns Lista com alunos cadastrados
     * @returns valor nulo em caso de erro na consulta
     */
    static async listarAluno(): Promise<Array<Aluno> | null> {
        try {
            // Cria uma lista vazia que irá armazenar os objetos do tipo Aluno
            let listaDeAluno: Array<Aluno> = [];

            // Define a consulta SQL que irá buscar todos os registros da tabela 'aluno'
            const querySelectAluno = `SELECT * FROM aluno;`;

            // Executa a consulta no banco de dados e aguarda a resposta
            const respostaBD = await database.query(querySelectAluno);

            // Percorre cada linha retornada pela consulta
            respostaBD.rows.forEach((alunoBD) => {
                // Cria um novo objeto aluno usando os dados da linha atual (nome, cpf, telefone)
                const novoAluno: Aluno = new Aluno(
                    alunoBD.ra,
                    alunoBD.nome,
                    alunoBD.sobrenome,
                    alunoBD.dataNascimento,
                    alunoBD.endereco,
                    alunoBD.email,
                    alunoBD.celular
                );

                // Define o ID do aluno usando o valor retornado do banco
                novoAluno.setIdAluno(alunoBD.id_aluno);

                // Adiciona o novo cliente à lista de aluno
                listaDeAluno.push(novoAluno);
            });

            // Retorna a lista completa de alunos
            return listaDeAluno;
        } catch (error) {
            // Em caso de erro na execução da consulta, exibe uma mensagem no console
            console.error(`Erro na consulta ao banco de dados. ${error}`);

            // Retorna null para indicar que houve uma falha na operação
            return null;
        }
    }
}

export default Aluno;