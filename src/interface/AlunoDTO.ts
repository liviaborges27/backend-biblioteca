export interface AlunoDTO {
    idAluno? : number,
    ra: string,  // ID do livro (? indica um parâmetro opcional)
    nome: string,     
    sobrenome: string,     
    data_nascimento: Date,        
    endereco: string,
    email: string,       
    celular: string,
    situacao?: boolean  // Situação (cenas para os próximos capítulos)
}

 