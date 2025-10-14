-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);


-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
--adicionando mais 10 dados
('Puer', 'Hiede', '2002-08-07', 'Rua Silvestre, 1987', 'yuhang2958@uorak.com', '1629410132'),
('Livia', 'Borges', '2008-09-27', 'Rua Esplanada, 1024', 'livia.matos2721@gmail.com', '16991897777' ),
('Xoulo', 'Cauma', '2002-03-12', 'Rua Souza, 192','souza123@gmail.com', '16876432190'),
('Mobos', 'Coaca', '2008-02-19', 'Rua Coaca, 786', 'coaca44@gmail.com', '16723496742'),
('Lacir', 'Dyaguozo', '2005-03-27', 'Rua Lacir, 177', 'lacir@gmail.com', '16823450987'),
('Sitas', 'Nyori', '2002-01-12', 'Rua Tacer, 1922', 'vopon@uorak.com', '16763452341'),
('Loibi', 'Gyoun', '2003-03-28', 'Rua Biboa, 1021', 'wyu2721@gmail.com', '16123454789' ),
('Naous', 'Topas', '2008-04-15', 'Rua Daosr, 1944','kocia@gmail.com', '16097645333'),
('Ceuka', 'Hisugeo', '2007-05-16', 'Rua Wehon, 123', 'retye@gmail.com', '16098653421'),
('Mupe', 'Loumayn', '2004-08-21', 'Rua Xaual, 432', 'ceixi@gmail.com', '162435678901');

SELECT * FROM Aluno;

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
--Adicionando mais 10 livros
('Ilíada ', ' Homero', 'Penguin-Companhia', '1852', '123-4541321146', 12, 20, 120.00, 'Disponível'),
('O Cortiço', 'Aluísio Azevedo', 'Moderna', '1890', '790-21535906587', 7, 7, 45.00, 'Disponível'),
('Os Sertões ', 'Euclides da Cunha', 'Todavia', ' 1902', '972-0142437111', 6, 8, 127.00, 'Disponível'),
('Triste Fim de Policarpo Quaresma ', 'Lima Barreto', 'Hedra', '1943', '456-85232001731', 18, 10, 10.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin', '1851', '922-0155536137', 10, 17, 76.00, 'Disponível'),
('Memórias Póstumas de Brás Cubas ', 'Machado de Assis', 'Hedra', '1881', '979-0007455577', 9, 9, 157.00, 'Disponível'),
('Vidas Secas ', 'Graciliano Ramos', 'Penguin Classics', '1938', '978-0140433266', 6, 6, 170.00, 'Disponível'),
('Frankenstein', 'Mary Shelley', 'Penguin Classics', '1818', '978-0145678518', 7, 8, 93.00, 'Disponível'),
('Jurassic Park', 'Michael Crichton', 'Todavi', '1990', '978-0142437456', 5, 7, 180.00, 'Disponível'),
('O Menino Maluquinho', 'Ziraldo', 'Companhia das Letras', '1980', '966-8535922343', 7, 3, 137.00, 'Disponível');


SELECT * FROM Livro;

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(11, 12, '2022-07-01', '2024-09-12', 'Em andamento'),
(12, 14, '2021-09-04', '2025-01-12', 'Em andamento'),
(11, 17, '2020-03-05', '2022-09-18', 'Em andamento'),
(15, 13, '2019-01-07', '2021-08-18', 'Em andamento'),
(18, 11, '2018-07-09', '2023-09-19', 'Em andamento'),
(14, 15, '2015-02-01', '2027-01-20', 'Em andamento'),
(17, 20, '2014-01-03', '2022-03-21', 'Em andamento'),
(20, 16, '2013-04-09', '2023-04-22', 'Em andamento'),
(16, 18, '2012-03-11', '2027-09-23', 'Em andamento'),
(13, 19, '2045-02-25', '2020-09-24', 'Em andamento'),
(16, 20, '2080-01-27', '2022-06-25', 'Em andamento'),
(19, 11, '1985-01-19', '2014-09-25', 'Em andamento'),
(13, 17, '2011-02-10', '2019-08-25', 'Em andamento'),
(14, 19, '2014-04-12', '2017-01-25', 'Em andamento');


SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;

