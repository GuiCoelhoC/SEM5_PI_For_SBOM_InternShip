% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_dispatch)).

edificio(a).
edificio(b).
edificio(c).
edificio(d).

pisos(a, [a1,a2]).
pisos(b, [b1,b2,b3]).
pisos(c, [c1,c3]).
pisos(d, [d1,d2,d3]).

corredor(a,b,a2,b2).
corredor(b,c,b2,c3).
corredor(b,d,b2,d3).
corredor(c,d,c3,d3).

%
elevador(a, [a1,a2]).
elevador(b, [b1,b2,b3]).
elevador(c, [c1,c3]).
elevador(d, [d1,d2,d3]).

%ligação
liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

%salas
ponto_acesso(apn,11,5,a1).

ponto_acesso(a201,6,6,a2).
ponto_acesso(a203,9,5,a2).
ponto_acesso(a205,11,5,a2).
ponto_acesso(a207,15,5,a2).
ponto_acesso(a209,19,3,a2).
ponto_acesso(a202,9,8,a2).
ponto_acesso(a204,13,8,a2).
ponto_acesso(a206,17,8,a2).
ponto_acesso(a207,21,9,a2).

ponto_acesso(b101,3,5,b1).
ponto_acesso(b103,7,5,b1).
ponto_acesso(b105,15,5,b1).
ponto_acesso(b106,21,5,b1).
ponto_acesso(b102,3,9,b1).
ponto_acesso(b106,18,9,b1).
ponto_acesso(b104,8,11,b1).
ponto_acesso(b106,21,11,b1).

ponto_acesso(b203,8,8,b2).
ponto_acesso(b202,14,5,b2).
ponto_acesso(b205,20,7,b2).
ponto_acesso(b207,21,5,b2).

ponto_acesso(b301,5,2,b3).
ponto_acesso(b303,7,2,b3).
ponto_acesso(b305,13,2,b3).
ponto_acesso(b302,14,11,b3).

ponto_acesso(c101,6,3,c1).
ponto_acesso(c103,6,7,c1).
ponto_acesso(c105,6,19,c1).
ponto_acesso(c102,9,19,c1).
ponto_acesso(c104,9,15,c1).
ponto_acesso(c106,9,11,c1).
ponto_acesso(c108,9,7,c1).
ponto_acesso(c110,9,3,c1).

ponto_acesso(c301,5,7,c3).
ponto_acesso(c304,8,7,c3).
ponto_acesso(c302,6,5,c3).
ponto_acesso(c306,12,11,c3).
ponto_acesso(c308,12,15,c3).
ponto_acesso(c310,10,17,c3).
ponto_acesso(c305,6,17,c3).
ponto_acesso(c303,3,17,c3).

ponto_acesso(d101,3,5,d1).
ponto_acesso(d103,5,11,d1).
ponto_acesso(d105,5,15,d1).
ponto_acesso(d108,8,19,d1).
ponto_acesso(d106,8,13,d1).
ponto_acesso(d104,8,8,d1).
ponto_acesso(d102,11,3,d1).

ponto_acesso(d201,5,4,d2).
ponto_acesso(d203,5,10,d2).
ponto_acesso(d205,5,15,d2).
ponto_acesso(d206,7,18,d2).
ponto_acesso(d204,9,15,d2).
ponto_acesso(d202,8,10,d2).

ponto_acesso(d301,5,8,d3).
ponto_acesso(d303,5,11,d3).
ponto_acesso(d305,7,17,d3).
ponto_acesso(d304,9,11,d3).
ponto_acesso(d302,9,8,d3).

%posição corredores
corr_pos(a2b2,23,6,a2).
corr_pos(b2a2,1,7,b2).

corr_pos(b2c3,25,12,b2).
corr_pos(c3b2,1,10,c3).

corr_pos(b2d3,24,13,b2).
corr_pos(d3b2,9,1,d3).

corr_pos(c3d3,1,16,c3).
corr_pos(d3c3,13,2,d3).

%posição elevadores
elev_pos(ea1,21,3,a1).
elev_pos(ea2,21,3,a2).

elev_pos(eb1,24,9,b1).
elev_pos(eb2,24,9,b2).
elev_pos(eb3,23,10,b3).

elev_pos(ec1,3,13,c1).
elev_pos(ec2,3,13,c3).

elev_pos(ed1,3,2,d1).
elev_pos(ed2,3,2,d2).
elev_pos(ed3,3,2,d3).

:- dynamic node/5.
:- dynamic m/4.
:- dynamic ligacel/3.
:- dynamic cel/2.
:- dynamic edge/4.
:-set_prolog_flag(answer_write_options,[max_depth(0)]).
:-set_prolog_flag(report_error,true).
:-set_prolog_flag(unknown,error).

matriza1([
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matriza2([
            [3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 3, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 3, 2, 2, 0, 2, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1, 2, 0, 2, 1, 2, 0, 2, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizb1([
            [3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 0, 2, 2, 1, 0, 3, 2, 2, 2, 2, 3, 2, 2, 2, 2, 0, 2, 1, 0, 0, 3, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 3, 0, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizb2([
            [3, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 3, 2, 2, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 2, 2, 2, 1],
                [2, 2, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 3, 0, 1],
                [1, 0, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0]
          ]).

matrizb3([
            [3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
                [1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2, 2, 2, 2, 2, 2, 1, 0, 2, 2, 0],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizc1([
            [3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 1, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizc3([
            [3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 3, 0, 2, 3, 2, 2, 2, 2, 1],
                [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
                [2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [3, 2, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 1],
                [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [3, 2, 0, 2, 3, 0, 2, 2, 3, 0, 2, 2, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizd1([
            [3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 0, 0, 3, 2, 2, 0, 2, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 0, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 3, 2, 2, 2, 2, 1],
            [3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizd2([
            [3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 1, 0, 0, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 0, 2, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 2, 0, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizd3([
            [3, 2, 3, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

fazer_matrizes() :-
    remover_factos(),
    matriza1(Matriza1),
    converter_matriz(Matriza1,a1),
    matriza2(Matriza2),
    converter_matriz(Matriza2,a2),
    matrizb1(Matrizb1),
    converter_matriz(Matrizb1,b1),
    matrizb2(Matrizb2),
    converter_matriz(Matrizb2,b2),
    matrizb3(Matrizb3),
    converter_matriz(Matrizb3,b3),
    matrizc1(Matrizc1),
    converter_matriz(Matrizc1,c1),
    matrizc3(Matrizc3),
    converter_matriz(Matrizc3,c3),
    matrizd1(Matrizd1),
    converter_matriz(Matrizd1,d1),
    matrizd2(Matrizd2),
    converter_matriz(Matrizd2,d2),
    matrizd3(Matrizd3),
    converter_matriz(Matrizd3,d3).


% Predicado para converter a matriz em fatos Prolog
converter_matriz(Matriz,Floor) :-
    converter_matriz_aux(Matriz, 1, 0,Floor).

converter_matriz_aux([], _, _,_).
converter_matriz_aux([Linha|Resto], LinhaAtual, ID,Floor) :-
    converter_linha(Linha, LinhaAtual, 1, ID, ProximoID,Floor),
    ProximaLinha is LinhaAtual + 1,
    converter_matriz_aux(Resto, ProximaLinha, ProximoID,Floor).

% Predicado para converter uma linha em fatos Prolog
converter_linha([], _, _, ID, ID,_).
converter_linha([Valor|Resto], Linha, Coluna, ID, ProximoID,Floor) :-
    atomic_concat(Floor, '(', TempID),
    atomic_concat(TempID, Coluna, TempID2),
    atomic_concat(TempID2, ',', TempID3),
    atomic_concat(TempID3, Linha, TempID4),
    atomic_concat(TempID4, ')', NovoIDAtom),
    term_to_atom(NovoID, NovoIDAtom),
    % write('NovoID: '), write(NovoID), nl,
    assertz(node(NovoID, Coluna, Linha, Valor, Floor)),
    %write(node(NovoID, Coluna, Linha, Valor, Floor)), nl,
    ProximaColuna is Coluna + 1,
    converter_linha(Resto, Linha, ProximaColuna, NovoID, ProximoID,Floor).

remover_factos() :-
    retractall(node(_, _, _, _, _)). % Remove todos os fatos node


fazerGrafos() :-
    cria_grafo(23,11,a1),
    cria_grafo(23,11,a2),
    cria_grafo(25,13,b1),
    cria_grafo(25,13,b2),
    cria_grafo(25,13,b3),
    cria_grafo(13,21,c1),
    cria_grafo(13,21,c3),
    cria_grafo(13,21,d1),
    cria_grafo(13,21,d2),
    cria_grafo(13,21,d3).


cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,Piso):-
  cria_grafo_lin(Col,Lin,Piso),
  Lin1 is Lin-1,
  cria_grafo(Col,Lin1,Piso).


cria_grafo_lin(0,_,_):-!.

cria_grafo_lin(Col,Lin,Piso):-
  ((corr_pos(_, Col, Lin, Piso),%Piso == "A1",trace,
  node(Id1, Col, Lin, _, Piso))
  ;
  (elev_pos(_, Col, Lin, Piso),%Piso == "A1",trace,
  node(Id1, Col, Lin, _, Piso))
  ;
  (ponto_acesso(_, Col, Lin, Piso),%trace,
  node(Id1, Col, Lin, _, Piso))
  ;
  node(Id1,Col,Lin,0,Piso)),
  !,
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  ((node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id2, 1, Piso));true)), % Verifca à direita.
  ((node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id3, 1, Piso));true)), % Verifca à esquerda.
  ((node(Id4,Col,LinS,0,Piso), assertz(edge(Id1, Id4, 1, Piso));true)), % Verifica abaixo.
  ((node(Id5,Col,LinA,0,Piso), assertz(edge(Id1, Id5, 1, Piso));true)), % Verifica acima.
  C is sqrt(2),
  ((node(Id6,ColS,LinA,0,Piso), node(_, ColS, Lin, 0, Piso), node(_, Col, LinA, 0, Piso), assertz(edge(Id1, Id6, C, Piso));true)), % Verifica diagonal superior direita.
  ((node(Id7,ColA,LinA,0,Piso), node(_, ColA, Lin, 0, Piso), node(_, Col, LinA, 0, Piso), assertz(edge(Id1, Id7, C, Piso));true)), % Verifica diagonal superior esquerda.
  ((node(Id8,ColS,LinS,0,Piso), node(_, ColS, Lin, 0, Piso), node(_, Col, LinS, 0, Piso), assertz(edge(Id1, Id8, C, Piso));true)), % Verifica diagonal inferior direita.
  ((node(Id9,ColA,LinS,0,Piso), node(_, ColA, Lin, 0, Piso), node(_, Col, LinS, 0, Piso), assertz(edge(Id1, Id9, C, Piso));true)), % Verifica diagonal inferior esquerda.

  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin,Piso),!.

cria_grafo_lin(Col,Lin,Piso):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).


% Relaciona o pedido HTTP a um predicado
:- http_handler('/path_between_floors', path_between_floors, []).

% Cria o servidor HTTP
server(Port) :-
  http_server(http_dispatch, [port(Port)]).

path_between_floors(Request):-
  cors_enable(Request, [methods([get])]),
  http_parameters(Request, [origem(Origem, []), destino(Destino, [])]),

  Or = Origem,
  Dest = Destino,

  remover_factos(),
  fazer_matrizes(),
  fazerGrafos(),

  writeln('Origem: '), writeln(Or),
  writeln('Destino: '), writeln(Dest),

  % Busca pelas coordenadas e piso da origem e do destino através dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  caminho_pisos(PisoOr, PisoDest, _, Cam, PisosPer),

  node(X1, COr, LOr, _, PisoOr), % Pos inicial tem que ser   %define_dados(ResVal, PisoOr, COr, LOr, PisoDest, CDest, LDest),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest), % Pos destino tem que ser 0 também.
  edge(Y1, Y, _, PisoDest),

  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X, Y,_),

  converte_cam_final(Cam, CamF),
  
  R = json([sol1=CamF, sol2=CamPorPiso]),
  reply_json(R).

path_between_floors_sem_pedido(Or,Dest):-

  retractall(node(_, _, _, _, _)),
  retractall(edge(_, _, _, _)),
  fazer_matrizes(),
  fazerGrafos(),

  % Busca pelas coordenadas e piso da origem e do destino através dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  caminho_pisos(PisoOr, PisoDest, _, Cam, PisosPer),

  node(X1, COr, LOr, _, PisoOr), % Pos inicial tem que ser   %define_dados(ResVal, PisoOr, COr, LOr, PisoDest, CDest, LDest),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest), % Pos destino tem que ser 0 também.
  edge(Y1, Y, _, PisoDest),

  write('Antes!!! '), nl,
  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X, Y, CustoTotal),!,

  write('Depois!!! '), nl,

  write('CustoTotal: '), write(CustoTotal), nl,

  converte_cam_final(Cam, CamF),
    write('CamF: '), write(CamF), nl,
   % converte_CamPorPiso(CamF, CamPorPiso, CamPorPisoF),
    write('CamPorPiso: '), write(CamPorPiso), nl.

  % CamF tem piso1, cor/elev, piso2
  % CamPorPiso tem os IDs que precisam de ser convertidos para as coordenadas.
  % CamPorPiso = [[10,20,2,421,56,25,15,21,51...][4,21,42,...]], uma array de ids para cada piso~
  % converte_CamPorPiso(CamF, CamPorPiso, CamPorPisoF).
  converte_CamPorPiso([], [[]|_], []).
  converte_CamPorPiso([[_,_,_]|T], [], []):- converte_CamPorPiso(T, [], []).
  converte_CamPorPiso([[PO,_,_]|_], [ID|T1], [IDF|T2]):-
    node(ID, Col, Lin, _, Piso),
    IDF = [Col, Lin, Piso],
    converte_CamPorPiso([[PO,_,_]|_], T1, T2).


busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest):-
  ((ponto_acesso(Or, COr, LOr, PisoOr);corr_pos(Or, COr, LOr, PisoOr);elev_pos(Or, COr, LOr, PisoOr)),
  (ponto_acesso(Dest, CDest, LDest, PisoDest);corr_pos(Dest, CDest, LDest, PisoDest);elev_pos(Dest, CDest, LDest, PisoDest))).

converte_cam_final([], []).

converte_cam_final([elev(PO,PD)|T], [[PO,elev,PD]|T2]):-
  converte_cam_final(T, T2).

converte_cam_final([cor(PO,PD)|T], [[PO,cor,PD]|T2]):-
  converte_cam_final(T, T2).

remove_double_quotes([], []).  % Base case: an empty list remains empty

remove_double_quotes([H|T], [H1|T1]) :-
    atomic(H),
    atom_chars(H, Chars),
    exclude(=( '"'), Chars, CharsWithoutQuotes),
    atomic_list_concat(CharsWithoutQuotes, H1),
    atom(H1),
    remove_double_quotes(T, T1).

remove_double_quotes([H|T], [H1|T1]) :-
    compound(H),
    H =.. [F|Args],  % Decompose compound term into functor and arguments
    remove_double_quotes(Args, ArgsWithoutQuotes),  % Recursively process arguments
    H1 =.. [F|ArgsWithoutQuotes],  % Reconstruct compound term with modified arguments
    remove_double_quotes(T, T1).

remove_double_quotes([H|T], Result) :-
    \+ (atomic(H); compound(H)),  % Skip non-atomic and non-compound elements
    remove_double_quotes(T, Result).


remove_quotes([], []).
remove_quotes([cor(A,B)|T1], [cor(A1,B1)|T0]) :-
  atom_chars(A, [O,T|_]), % skip the quotes
  atom_chars(B, [O2,T2|_]), % skip the quotes
  atom_concat(O, T, A1),
  atom_concat(O2, T2, B1),
  remove_quotes(T1, T0).
remove_quotes([elev(C,D)|T1], [elev(C1,D1)|T0]) :-
  atom_chars(C, [O,T|_]), % skip the quotes
  atom_chars(D, [O2,T2|_]), % skip the quotes
  atom_concat(O, T, C1),
  atom_concat(O2, T2, D1),
  remove_quotes(T1, T0).

extrai_request(Data, [Data.origem, Data.posOrigem, Data.destino, Data.posDestino|[]]).

define_dados([PO, [ColOr, LinOr], PD, [ColDest, LinDest]], PO, ColOr, LinOr, PD, ColDest, LinDest).

%%%

%%%

% Vai aplicar o A-Star a cada um dos pisos da solução de melhor_caminho_pisos ou caminho_pisos.
% 1º - Lista de pisos da solução.
% 2º - Lista de listas contendo as soluções do A-Star para cada piso.
aStar_piso([PisoDest|[]], [UltCaminho|[]], [], Or, Dest,CustoTotal):-
    aStar(Or, Dest, UltCaminho, Custo, PisoDest),
    CustoTotal is Custo,
    !.

aStar_piso([PisoAct, PisoProx|ProxPisos], [[CamPiso]|Restante], [TravessiaEd|Travessias], IdInicial, Dest, CustoTotal):-

  ((TravessiaEd == elev(PisoAct, PisoProx), elev_pos(_, Col, Lin, PisoAct), node(_, Col, Lin, _, PisoAct),
  edge(IdCorr, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), elev_pos(_, Col1, Lin1, PisoProx),
  node(IdElevProxPiso, Col1, Lin1, _, PisoProx), edge(IdElevProxPiso, IdInicialProxPiso, _, PisoProx),!)
  ;
  (TravessiaEd == cor(PisoAct, PisoProx), corr_pos(_, Col, Lin, PisoAct), node(IdCorr, Col, Lin, _, PisoAct),
  edge(IdCorr, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), corr_pos(_, Col1, Lin1, PisoProx),
  node(IdCorrProxPiso, Col1, Lin1, _, PisoProx), edge(IdCorrProxPiso, IdInicialProxPiso, _, PisoProx))),

  append([PisoProx], ProxPisos, L),
  aStar_piso(L, Restante, Travessias, IdInicialProxPiso, Dest, CustoRestante),
  CustoTotal is Custo + CustoRestante.



%%Algoritmos.
caminho_pisos(PisoOr, PisoDest, LEdCam, LLig, LPiCam):-
  pisos(EdOr, LPisosOr), member(PisoOr, LPisosOr),
  pisos(EdDest, LPisosDest), member(PisoDest, LPisosDest),
  caminho_edificios(EdOr, EdDest, LEdCam),
  %!, % Cut to prevent backtracking on the caminho_edificios/3 predicate
  segue_pisos(PisoOr, PisoDest, LEdCam, LLig, LPiCam2),
  append([PisoOr], LPiCam2, LPiCam).

segue_pisos(PisoDest, PisoDest, _, [], []).

segue_pisos(PisoDest1, PisoDest, [EdDest], [elev(PisoDest1, PisoDest)], [PisoDest | _]):-
  PisoDest \== PisoDest1,
  elevador(EdDest, LPisos), member(PisoDest1, LPisos), member(PisoDest, LPisos).
  %!. % Cut to prevent backtracking

segue_pisos(PisoAct, PisoDest, [EdAct, EdSeg | LOutrosEd], [cor(PisoAct, PisoSeg) | LOutrasLig], [PisoSeg | ListaPisos]):-
  (corredor(EdAct, EdSeg, PisoAct, PisoSeg); corredor(EdSeg, EdAct, PisoSeg, PisoAct)),
  segue_pisos(PisoSeg, PisoDest, [EdSeg | LOutrosEd], LOutrasLig, ListaPisos).
  %!. % Cut to prevent backtracking

segue_pisos(PisoAct, PisoDest, [EdAct, EdSeg | LOutrosEd], [elev(PisoAct, PisoAct1), cor(PisoAct1, PisoSeg) | LOutrasLig], [PisoAct1, PisoSeg | ListaPisos]):-
  (corredor(EdAct, EdSeg, PisoAct1, PisoSeg); corredor(EdSeg, EdAct, PisoSeg, PisoAct1)),
  PisoAct1 \== PisoAct,
  elevador(EdAct, LPisos), member(PisoAct, LPisos), member(PisoAct1, LPisos),
  segue_pisos(PisoSeg, PisoDest, [EdSeg | LOutrosEd], LOutrasLig, ListaPisos).
  %!. % Cut to prevent backtracking

caminho_edificios(EdOr, EdDest, LEdCam):-
  caminho_edificios2(EdOr, EdDest, [EdOr], LEdCam).
  %!. % Cut to prevent backtracking

caminho_edificios2(EdX, EdX, LEdInv, LEdCam):-
  !, reverse(LEdInv, LEdCam).

caminho_edificios2(EdAct, EdDest, LEdPassou, LEdCam):-
  (liga(EdAct, EdInt); liga(EdInt, EdAct)),
  \+member(EdInt, LEdPassou),
  caminho_edificios2(EdInt, EdDest, [EdInt | LEdPassou], LEdCam).
  %!. % Cut to prevent backtracking


% Algoritmo que vai retornar os caminhos com o critério de preferência sem elevadores.
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor,LPiCam):-
findall(_,caminho_pisos(PisoOr,PisoDest,_,_,LPiCam),LLLig),
menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).

menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
conta(LLig,NElev1,NCor1),
(((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
(NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.


% A-star.
aStar(Orig,Dest,Cam,Custo,Piso):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo,Piso).

% Se for preciso apenas o melhor caminho, colocar cut a seguir ao reverse.
aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
	reverse([Dest|T],Cam),!.

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Piso):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,edge(Act,X,CustoX,Piso),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX,Piso),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo,Piso).

% substituir a chamada edge(Act,X,CustoX)
% por (edge(Act,X,CustoX);edge(X,Act,CustoX))
% se quiser ligacoes bidirecionais


estimativa(Nodo1,Nodo2,Estimativa,Piso):-
	node(Nodo1,X1,Y1,_,Piso),
	node(Nodo2,X2,Y2,_,Piso),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).