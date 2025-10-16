class Livro {
    // Atributos
    private idLivro: number;
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
        _idLivro: number,
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
        this.idLivro = _idLivro;
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

    // Método para exibir os dados
    public exibirDados(): void {
        console.log(`ID Livro: ${this.idLivro}
    Título: ${this.titulo}
    Autor: ${this.autor}
    Editora: ${this.editora}
    Ano Publicação: ${this.anoPublicacao}
    ISBN: ${this.isbn}
    Quantidade Total: ${this.quantTotal}
    Quantidade Disponível: ${this.quantDisponivel}
    Valor Aquisição: R$ ${this.valorAquisicao.toFixed(2)}
    Status Livro Emprestado: ${this.statusLivroEmprestado}`);
    }
}

