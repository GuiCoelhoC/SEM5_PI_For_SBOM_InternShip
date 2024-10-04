:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:-consult('Facts.pl').
:-consult('PlanoTarefas.pl').

start_server(Port) :-   
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

:- set_setting(http:cors, [*]).

inicializar_sistema:-   
    carrega_factos().

inicializar_server :-   
    start_server(4200),!,
    inicializar_sistema, !,
    write('Server started on port 4200').

:- http_handler('/api/Assignment/sequence', cors_handler, [method(options)]).

cors_handler(Request) :-
    cors_enable(Request, [ methods([get,options])]),
    format('~n').

sequence_task_requests(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [id1(ID, [string])]),
    plano_atendimento(ID,S,C),
    format('Content-type: application/json~n~n'),
    format('{"sequence": "~w","cost": "~w"}', [S,C]).

stop_server:-   
    apaga_factos(),
    retract(port(Port)),
    http_stop_server(Port,_).