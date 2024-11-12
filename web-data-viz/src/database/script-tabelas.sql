CREATE DATABASE lersov;
USE lersov;


CREATE TABLE empresa(
	id int primary key,
    nome varchar(45) not null,
    cnpj char(18) not null,
    email varchar(45) not null,
    senha varchar(45) not null,
    situacao varchar(45) not null,
    constraint chkSituacao
		check (situacao in('aprovado', 'reprovado', 'em aguardo'))
); 
	INSERT INTO empresa VALUES
		(1,'Assaí', '06.057.223/0001-71', 'assai@empresa', '123456ASSAI', 'aprovado'),
        (2,'Carrefour Express', '45.543.915/0873-68', 'carrefour@empresa', '090909CARREFOUR', 'reprovado'),
        (3,'Atacadão', '75.315.333/0049-53', 'atacadao@empresa', '76767ATACADAO', 'aprovado');
	
    
	select*from empresa;

    select nome as Empresa,
    cnpj as CNPJ,
    email as Email,
    senha as Senha,
    tipo as 'Tipo de empresa',
    CASE 
    WHEN situacao = 'reprovado' THEN 'Não é atacado'
    ELSE 'É atacado'
    END as 'Motivo de aprovação e reprovação'
    FROM empresa;
	
    
CREATE TABLE metricas(
	idMetrica INT AUTO_INCREMENT,
    alto INT,
    medio INT,
    baixo INT,
    fkEmpresa INT,
    PRIMARY KEY(idMetrica, fkEmpresa),
    CONSTRAINT fkMetricaEmpresa
		FOREIGN KEY (fkEmpresa) REFERENCES empresa(id)
);

    
CREATE TABLE formulario(
	idFormulario int primary key auto_increment,
    qtdCorredoresComSensor varchar(10) not null,
    dtImplementacao date not null,
    logradouro varchar(60),
    numero int,
    complemento varchar(45),
    cep char(8),
    bairro varchar(45),
    cidade varchar(45),
    estado varchar(45),
    fkEmpresa int,
    constraint fkFormularioEmpresa
		foreign key (fkEmpresa) references empresa(id)
);

desc formulario;

INSERT INTO formulario VALUES
	(default, '7', '2024-02-12', 'Avenida Rodolfo Pirani', 200, 'Nenhum', 1);
    
select*from formulario;


select idFormulario as Formulario,
	qtdCorredoresComSensor as 'Corredores com Sensor',
    dtImplementacao as 'Data para implementação',
    nome as Empresa
    FROM formulario as F
    JOIN empresa as E
    ON F.fkEmpresa = E.id;


CREATE TABLE funcionarios(
	idFuncionario int,
    fkEmpresa int,
    primary key(idFuncionario, fkEmpresa),
    constraint fkfuncionariosEmpresa
		foreign key (fkEmpresa) references empresa(id),
    nome varchar(45) not null,
    email varchar(45) not null,
    senha varchar(45) not null
);

INSERT INTO funcionarios VALUES
	(1, 1, 'Rafael', 'rafa@assai.atacadista', 'senhaASSAI01'),
    (2, 1, 'Pedro', 'pedro@assai.atacadista', 'senhaASSAI02'),
    (3, 1, 'Junior', 'junior@assai.atacadista', 'senhaASSAI03'),
    (4, 3, 'Marcelo', 'marcelo@atacadao.atacadista', 'senhaATACADAO01'),
    (5, 3, 'Breno', 'breno@atacadao.atacadista', 'senhaATACADAO02');
  
    
select*from funcionarios;

select func.nome as Funcionário,
	E.nome as Empresa,
    func.email as 'Email Corporativo',
    func.senha as 'Senha de acesso'
    from funcionarios as func
    JOIN empresa as E
    ON func.fkEmpresa = E.id;
    
CREATE TABLE contato(
	idContato int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    empresa varchar(450),
    socioOuCeo varchar(10),
    mensagem varchar(150)
);

INSERT INTO contato VALUES
	(default, 'Leandro Agosto', 'leandro@assaiCEO', 'Assaí', 'Ceo','Estou interessado no produto de vocês e gostaria de mais informações! Grato.'),
    (default, 'Fernando Julhos', 'Fernando@carrefourSOCIO', 'Carrefour Express', 'Sócio','Estou interessado no produto de vocês, quero mais informações por favor.'),
    (default, 'João Setembros', 'joao@atacadaoCEO', 'Atacadão', 'Ceo','Gostaria de mais informações de como prosseguir para contratá-los, grato.');
    
select*from contato;

select nome as Nome,
	email as Email,
    empresa as Empresa,
    socioOuCEo as 'Sócio ou Ceo',
    mensagem as 'Mensagem'
    FROM contato;
    
    
-- EMPRESA QUE ESTAMOS NOS REFERINDO: ASSAÍ
    
CREATE TABLE corredor(
	idCorredor int primary key,
    setor varchar(60),
    fkEmpresa INT,
    CONSTRAINT fkCorredorEmpresa
		foreign key (fkEmpresa) REFERENCES empresa(id)
);

INSERT INTO corredor VALUES
	(1,'Limpeza e Higiene', 1),
    (3,'Adega', 1),
    (4,'Massas', 1),
    (7,'Doces', 1),
    (6,'Utensílios', 1),
    (5,'Congelados', 1),
    (2,'Bebidas', 1);
    
    select * from corredor;
    
    SELECT C.idCorredor as Corredor,
	C.setor as Setor,
    E.nome as 'Empresa do corredor'
    FROM corredor as C
    JOIN empresa as E
    ON C.fkEmpresa = E.id;
    
    
CREATE TABLE sensor(
	idSensor int primary key,
    tipo varchar(45),
    estadoSensor varchar(10),
	constraint chkEstadoSensor
		check (estadoSensor in('Ativado', 'Desativado')),
    manutencaoEmDia char(3),
	constraint chkManutencao
		check (manutencaoEmDia in('Sim', 'Não')),
    fkCorredor INT,
    CONSTRAINT fkSensorCorredor
		FOREIGN KEY (fkCorredor) REFERENCES corredor(idCorredor)
);

INSERT INTO sensor VALUES
	(1,'TCRT5000', 'Ativado', 'Sim', 1),
    (2,'TCRT5000', 'Ativado', 'Sim', 1),
    (3,'TCRT5000', 'Ativado', 'Sim', 2),
    (4,'TCRT5000', 'Ativado', 'Não', 2),
    (5,'TCRT5000', 'Ativado', 'Sim', 3),
    (6,'TCRT5000', 'Ativado', 'Sim', 3),
    (7,'TCRT5000', 'Desativado', 'Não', 4),
    (8,'TCRT5000', 'Desativado', 'Sim', 4),
    (9,'TCRT5000', 'Ativado', 'Sim', 5),
    (10,'TCRT5000', 'Ativado', 'Sim', 5),
    (11,'TCRT5000', 'Ativado', 'Sim', 6),
    (12,'TCRT5000', 'Ativado', 'Sim', 6),
    (13,'TCRT5000', 'Ativado', 'Não', 7),
    (14,'TCRT5000', 'Ativado', 'Sim', 7);
    
select * from sensor;

select S.idSensor as Sensor,
	S.tipo as 'Tipo de sensor',
    S.estadoSensor as 'Estado',
    S.manutencaoEmDia as 'Manutenção em dia',
    CASE
    WHEN manutencaoEmDia = 'Não' THEN 'Fazer manutenção'
    ELSE 'Manutenção Feita'
    END as 'Necessidade de manutenção',
    C.idCorredor as 'Id Corredor',
    C.setor as Setor
    FROM sensor as S
    JOIN corredor as C
    ON S.fkCorredor = C.idCorredor;


CREATE TABLE alertas(
	idAlerta int primary key,
    fluxo varchar(45),
    constraint chkFluxoTipo
		check(fluxo in('Alto', 'Moderado', 'Baixo'))
);

INSERT INTO alertas VALUES
	(1, 'Alto'),
    (2, 'Moderado'),
    (3, 'Baixo');
    
select * from alertas;


CREATE TABLE dadosSensor(
	idDados int auto_increment,
    fkSensor int,
    primary key(idDados, fkSensor),
    constraint fkDadosSensorSensor
		foreign key (fkSensor) references sensor(idSensor),
	dtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fluxoDePessoas varchar(45),
    fkAlerta int,
    constraint fkDadosSensorAlerta
		foreign key (fkAlerta) references alertas(idAlerta)
);

INSERT INTO dadosSensor(fkSensor, fluxoDePessoas, fkAlerta) VALUES
	(1,'1000', 1),
    (1, '990', 1),
    (2, '600', 2),
    (2, '610', 2),
    (3, '400', 3),
    (3, '410', 3),
    (4, '1200', 1),
    (4, '1235', 1),
    (5, '650', 2),
    (5, '630', 2),
    (6, '310', 3),
    (6, '300', 3),
    (7, '2000', 1),
    (7, '1990', 1);
    
select * from dadosSensor;

SELECT D.idDados as 'ID dado',
D.fkSensor as 'ID sensor',
D.dtHora as 'Dia e hora',
D.fluxoDePessoas as 'Quantidade de pessoas no corredor',
A.fluxo as 'Fluxo'
FROM dadosSensor as D
JOIN alertas as A
ON D.fkAlerta = A.idAlerta;


-- SELECIONAR UM ÚNICO DADO
SELECT D.idDados as ID,
D.fkSensor as 'ID sensor',
D.dtHora as 'Dia e hora',
D.fluxoDePessoas as 'Quantidade de pessoas no corredor',
A.fluxo as 'Fluxo'
FROM dadosSensor as D
JOIN alertas as A
ON D.fkAlerta = A.idAlerta
WHERE idDados = 1 and fkSensor = 1;
    



