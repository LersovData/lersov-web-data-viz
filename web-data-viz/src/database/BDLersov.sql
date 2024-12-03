CREATE DATABASE lersov;
USE lersov;

CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
); 

INSERT INTO empresa (nome, cnpj, email, senha) VALUES
		('Assaí', '06.057.223/0001-71', 'assai@empresa', '123456ASSAI'),
        ('Carrefour Express', '45.543.915/0873-68', 'carrefour@empresa', '090909CARREFOUR'),
        ('Atacadão', '75.315.333/0049-53', 'atacadao@empresa', '76767ATACADAO');
    
CREATE TABLE metricas(
	idMetrica INT AUTO_INCREMENT,
    fkEmpresa INT,
    alto INT,
    medio INT,
    baixo INT,
    PRIMARY KEY(idMetrica, fkEmpresa),
    CONSTRAINT fkMetricaEmpresa
		FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE formulario(
	idFormulario INT PRIMARY KEY AUTO_INCREMENT,
    qtdCorredoresComSensor VARCHAR(10) NOT NULL,
    dtImplementacao DATE NOT NULL,
    logradouro VARCHAR(60),
    numero INT,
    complemento VARCHAR(45),
    cep CHAR(8),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    estado VARCHAR(45),
    fkEmpresa INT,
    CONSTRAINT fkFormularioEmpresa
		FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE funcionarios(
	idFuncionario INT AUTO_INCREMENT,
    fkEmpresa INT,
    PRIMARY KEY(idFuncionario, fkEmpresa),
    CONSTRAINT fkFuncionariosEmpresa
		FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

INSERT INTO funcionarios (fkEmpresa, nome, email, senha) VALUES
	(1, 'Rafael', 'rafa@assai.atacadista', 'senhaASSAI01'),
    (1, 'Pedro', 'pedro@assai.atacadista', 'senhaASSAI02'),
    (2, 'Junior', 'junior@assai.atacadista', 'senhaASSAI03'),
    (3, 'Marcelo', 'marcelo@atacadao.atacadista', 'senhaATACADAO01'),
    (3, 'Breno', 'breno@atacadao.atacadista', 'senhaATACADAO02');
    
CREATE TABLE contato(
	idContato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    empresa VARCHAR(450),
    socioOuCeo VARCHAR(10),
    mensagem VARCHAR(150),
    dtContato TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    respondido BOOLEAN
);

INSERT INTO contato (nome, email, empresa, socioOuCeo, mensagem, respondido) VALUES
	('Leandro Agosto', 'leandro@assaiCEO', 'Assaí', 'Ceo', 'Estou interessado no produto de vocês e gostaria de mais informações! Grato.', true),
    ('Fernando Julhos', 'Fernando@carrefourSOCIO', 'Carrefour Express', 'Sócio','Estou interessado no produto de vocês, quero mais informações por favor.', false),
    ('João Setembros', 'joao@atacadaoCEO', 'Atacadão', 'Ceo', 'Gostaria de mais informações de como prosseguir para contratá-los, grato.', false);
      
CREATE TABLE corredor(
	idCorredor INT PRIMARY KEY AUTO_INCREMENT,
    setor VARCHAR(60),
    fkEmpresa INT,
    CONSTRAINT fkCorredorEmpresa
		FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO corredor (setor, fkEmpresa) VALUES
	('Limpeza e Higiene', 1),
    ('Adega', 1),
    ('Massas', 1),
    ('Doces', 1),
    ('Utensílios', 1),
    ('Congelados', 1),
    ('Bebidas', 1);    

CREATE TABLE sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(45),
    estadoSensor VARCHAR(10),
	CONSTRAINT chkEstadoSensor
		CHECK (estadoSensor IN('Ativado', 'Desativado')),
    fkCorredor INT,
    CONSTRAINT fkSensorCorredor
		FOREIGN KEY (fkCorredor) REFERENCES corredor(idCorredor)
);

INSERT INTO sensor (tipo, estadoSensor, fkCorredor) VALUES
	('TCRT5000', 'Ativado', 1),
    ('TCRT5000', 'Ativado', 1),
    ('TCRT5000', 'Ativado', 2),
    ('TCRT5000', 'Ativado', 2),
    ('TCRT5000', 'Ativado', 3),
    ('TCRT5000', 'Ativado', 3),
    ('TCRT5000', 'Desativado', 4),
    ('TCRT5000', 'Desativado', 4),
    ('TCRT5000', 'Ativado', 5),
    ('TCRT5000', 'Ativado', 5),
    ('TCRT5000', 'Ativado', 6),
    ('TCRT5000', 'Ativado', 6),
    ('TCRT5000', 'Ativado', 7),
    ('TCRT5000', 'Ativado', 7);

CREATE TABLE alertas(
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    fluxo VARCHAR(45),
    CONSTRAINT chkFluxoTipo
		CHECK(fluxo IN('Alto', 'Moderado', 'Baixo'))
);

INSERT INTO alertas (fluxo) VALUES
	('Alto'),
    ('Moderado'),
    ('Baixo');
    
    
CREATE TABLE dadosSensor(
	idDados INT AUTO_INCREMENT,
    fkSensor INT,
    PRIMARY KEY(idDados, fkSensor),
    CONSTRAINT fkDadosSensorSensor
		FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
	dtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fluxoDePessoas VARCHAR(45),
    fkAlerta INT,
    CONSTRAINT fkDadosSensorAlerta
		FOREIGN KEY (fkAlerta) REFERENCES alertas(idAlerta)
);

INSERT INTO dadosSensor(fkSensor, fluxoDePessoas, fkAlerta, dtHora) VALUES
	(1, '1', 1, '2024-11-04 08:00:00'),
    (1, '1', 1, '2024-11-04 08:30:00'),
    (1, '1', 1, '2024-11-04 09:00:00'),
    (1, '1', 1, '2024-11-04 09:20:00'),
    (1, '1', 1, '2024-11-04 09:40:00'),
    (1, '1', 1, '2024-11-04 10:00:00'),
    (1, '1', 1, '2024-11-04 10:15:00'),
    (1, '1', 1, '2024-11-04 10:30:00'),
    (1, '1', 1, '2024-11-04 10:45:00'),
    (1, '1', 1, '2024-11-04 11:00:00'),
    (1, '1', 1, '2024-11-04 11:10:00'),
    (1, '1', 1, '2024-11-04 11:20:00'),
    (1, '1', 1, '2024-11-04 11:30:00'),
    (1, '1', 1, '2024-11-04 11:40:00');
    
    INSERT INTO dadosSensor(fkSensor, fluxoDePessoas, fkAlerta, dtHora) VALUES
	(5, '10', 1, '2024-11-04 08:00:00'),
    (5, '1', 1, '2024-11-04 08:30:00'),
    (5, '1', 1, '2024-11-04 09:00:00'),
    (5, '1', 1, '2024-11-04 09:20:00'),
    (5, '1', 1, '2024-11-04 09:40:00'),
    (5, '1', 1, '2024-11-04 10:00:00'),
    (5, '1', 1, '2024-11-04 10:15:00'),
    (5, '1', 1, '2024-11-04 10:30:00'),
    (5, '1', 1, '2024-11-04 10:45:00'),
    (5, '1', 1, '2024-11-04 11:00:00'),
    (5, '1', 1, '2024-11-04 11:10:00'),
    (5, '1', 1, '2024-11-04 11:20:00'),
    (5, '1', 1, '2024-11-04 11:30:00'),
    (5, '1', 1, '2024-11-04 11:40:00');
    
   INSERT INTO dadosSensor(fkSensor, fluxoDePessoas, fkAlerta, dtHora) VALUES
	(3, '1', 1, '2024-11-04 08:00:00'),
    (3, '1', 1, '2024-11-04 08:30:00'),
    (3, '1', 1, '2024-11-04 09:00:00'),
    (3, '1', 1, '2024-11-04 09:20:00'),
    (3, '1', 1, '2024-11-04 09:40:00'),
    (3, '1', 1, '2024-11-04 10:00:00'),
    (3, '1', 1, '2024-11-04 10:15:00'),
    (3, '1', 1, '2024-11-04 10:30:00'),
    (3, '1', 1, '2024-11-04 10:45:00'),
    (3, '1', 1, '2024-11-04 11:00:00'),
    (3, '1', 1, '2024-11-04 11:10:00'),
    (3, '1', 1, '2024-11-04 11:20:00'),
    (3, '1', 1, '2024-11-04 11:30:00'),
    (3, '1', 1, '2024-11-04 11:40:00');
    
CREATE TABLE administradores(
	idAdm INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45),
    senha VARCHAR(45)
);

INSERT INTO administradores (email, senha) VALUES
	('caina.silva@lersov.adm', 'lersov11adm1'),
	('moises.henry@lersov.adm', 'lersov22adm2'),
	('mathias.zocca@lersov.adm', 'lersov33adm3'),
	('natalia.almeida@lersov.adm', 'lersov44adm4');
    
    
CREATE TABLE manutencao(
	idManutencao INT AUTO_INCREMENT,
    fkAdm INT,
    fkSensor INT,
    descricao VARCHAR(65),
    situacao VARCHAR(45),
    CONSTRAINT fkAdmManu
		FOREIGN KEY (fkAdm) REFERENCES administradores(idAdm),
    CONSTRAINT fkSensorManu
		FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
	CONSTRAINT chkSituacaoManutencao
		CHECK(situacao IN('Concluída', 'Em andamento', 'Pendente')),
	PRIMARY KEY(idManutencao, fkAdm, fkSensor)
);

INSERT INTO manutencao VALUES
	(1, 1, 4, 'Sensor não está com a manutenção em dia, fazer uma avaliação', 'Pendente');
    
INSERT INTO manutencao VALUES
	(default, 1, 4, 'Sensor não está com a manutenção em dia, fazer uma avaliação', 'Pendente'),
	(default, 3, 7, 'Sensor não está trazendo os dados', 'Em andamento'),
	(default, 4, 13, 'Sensor não tem dados condizentes', 'Concluída');