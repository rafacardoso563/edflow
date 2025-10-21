create database EdFlow; 

use EdFlow; 

 

create table usuarios ( 

id_usuario int auto_increment primary key, 

nome varchar(255) not null, 

email varchar(255) not null unique, 

senha varchar(255) not null, 

perfil enum('admin','professor','aluno') 

); 

 

create table turmas ( 

id_turma int auto_increment primary key, 

nome varchar(255) not null, 

ano_letivo int not null 

); 

 

create table professores ( 

id_professor int auto_increment primary key, 

id_usuario int, 

foreign key (id_usuario) references usuarios(id_usuario) 

); 

 

create table alunos ( 

id_aluno int auto_increment primary key, 

id_usuario int, 

foreign key (id_usuario) references usuarios(id_usuario), 

data_nasc date not null, 

responsavel varchar(255) not null 

); 

 

create table matricula ( 

id_matricula int auto_increment primary key, 

id_aluno int, 

foreign key (id_aluno) references alunos(id_aluno), 

id_turma int, 

foreign key (id_turma) references turmas(id_turma), 

data_matricula date not null 

); 

 

create table professores_turmas ( 

id_prof_turma int auto_increment primary key, 

id_professor int, 

foreign key (id_professor) references professores(id_professor), 

id_turma int, 

foreign key (id_turma) references turmas(id_turma) 

); 

 

create table chamadas ( 

id_chamada int auto_increment primary key, 

id_turma int, 

foreign key (id_turma) references turmas(id_turma), 

id_aluno int, 

foreign key (id_aluno) references alunos(id_aluno), 

data date not null, 

status enum('presente','falta') not null 

); 

 

create table notas ( 

id_nota int auto_increment primary key, 

id_aluno int, 

foreign key (id_aluno) references alunos(id_aluno), 

id_turma int, 

foreign key (id_turma) references turmas(id_turma), 

nota1 decimal(5,2), 

nota2 decimal(5,2), 

nota3 decimal(5,2), 

media_final decimal(5,2) 

); 

 

 