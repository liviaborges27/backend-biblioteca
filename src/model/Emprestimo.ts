class Emprestimo {
    //atributos
    private idEmprestimo: number;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataEvolucao: Date;
    private statusEmprestimo: string;


    constructor(
        _idEmprestimo: number,
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataEvolucao: Date,
        _statusEmprestimo: string
    ) {
        this.idEmprestimo = _idEmprestimo;
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmprestimo;
        this.dataEvolucao = _dataEvolucao;
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

    public getDataEvolucao(): Date {
        return this.dataEvolucao;
    }
    public setDataEvolucao(_dataEvolucao: Date): void {
        this.dataEvolucao = _dataEvolucao;
    }

    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }
    public setStatusEmprestimo(_statusEmprestimo: string): void {
        this.statusEmprestimo = _statusEmprestimo;
    }

    // Método para exibir os dados
    public exibirDados(): void {
        console.log(`ID Empréstimo: ${this.idEmprestimo}
    ID Aluno: ${this.idAluno}
    ID Livro: ${this.idLivro}
    Data Empréstimo: ${this.dataEmprestimo}
    Data Devolução: ${this.dataEvolucao}
    Status: ${this.statusEmprestimo}`);
    }
}
