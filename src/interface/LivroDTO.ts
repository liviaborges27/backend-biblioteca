export interface LivroDTO {
    idLivro? : number,  // ID do livro (? indica um parâmetro opcional)
    titulo: string,   
    autor: string,     
    editora: string,        
    anoPublicacao: string,
    isbn: string,       
    quantTotal: number,
    quantDisponivel: number,
    valorAquisicao: number,
    statusLivroEmprestado: string,
    situacao?: boolean  // Situação (cenas para os próximos capítulos)
}

