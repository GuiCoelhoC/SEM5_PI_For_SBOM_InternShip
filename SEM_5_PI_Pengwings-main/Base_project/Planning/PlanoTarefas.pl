%tarefa(Id,TipoTarefa,PontoOrig,PontoDest).
tarefa(t1,entrega,a1,b1).
tarefa(t2,entrega,b2,c2).
tarefa(t3,entrega,c3,d3).
tarefa(t4,vigilancia,a4,b4).
tarefa(t5,vigilancia,b5,c5).
tarefa(t6,vigilancia,c6,d6).
tarefa(t7,desinfecao,a7,b7).
tarefa(t8,desinfecao,b8,c8).
tarefa(t9,desinfecao,c9,d9).

%robot(Id,TipoRobot,Capacidade).
robotEst(robot1, 1).
robotEst(robot2, 2).
robotEst(robot3, 3).

%robot_type(Id,TipoTarefa).
robot_type(1, entrega, 10).
robot_type(2, vigilancia, 10).
robot_type(3, desinfecao, 10).


% tarefas(NTarefas).
tarefas(9).

%temp_desloc(id tarefa 1,id tarefa 2,tempo)
temp_desloc(t1,t2,5).
temp_desloc(t2,t1,6).
temp_desloc(t1,t3,8).
temp_desloc(t3,t1,3).
temp_desloc(t2,t3,7).
temp_desloc(t3,t2,9).
temp_desloc(t1,t4,12).
temp_desloc(t4,t1,2).
temp_desloc(t2,t4,4).
temp_desloc(t4,t2,8).
temp_desloc(t3,t4,10).
temp_desloc(t4,t3,11).
temp_desloc(t1,t5,18).
temp_desloc(t2,t5,19).
temp_desloc(t3,t5,6).
temp_desloc(t4,t5,8).
temp_desloc(t5,t1,3).
temp_desloc(t5,t3,17).
temp_desloc(t5,t2,16).
temp_desloc(t5,t4,8).
temp_desloc(t1,t6,3).
temp_desloc(t2,t6,1).
temp_desloc(t3,t6,2).
temp_desloc(t4,t6,15).
temp_desloc(t5,t6,10).
temp_desloc(t6,t2,11).
temp_desloc(t6,t1,6).
temp_desloc(t6,t3,9).
temp_desloc(t6,t4,13).
temp_desloc(t6,t5,1).
temp_desloc(t1,t7,5).
temp_desloc(t2,t7,7).
temp_desloc(t3,t7,1).
temp_desloc(t4,t7,18).
temp_desloc(t5,t7,1).
temp_desloc(t6,t7,3).
temp_desloc(t7,t2,11).
temp_desloc(t7,t1,6).
temp_desloc(t7,t3,9).
temp_desloc(t7,t4,13).
temp_desloc(t7,t5,1).
temp_desloc(t7,t6,3).
temp_desloc(t1,t8,5).
temp_desloc(t2,t8,7).
temp_desloc(t3,t8,1).
temp_desloc(t4,t8,18).
temp_desloc(t5,t8,1).
temp_desloc(t6,t8,3).
temp_desloc(t7,t8,11).
temp_desloc(t8,t2,11).
temp_desloc(t8,t1,6).
temp_desloc(t8,t3,9).
temp_desloc(t8,t4,13).
temp_desloc(t8,t5,1).
temp_desloc(t8,t6,3).
temp_desloc(t8,t7,11).
temp_desloc(t1,t9,5).
temp_desloc(t2,t9,7).
temp_desloc(t3,t9,1).
temp_desloc(t4,t9,18).
temp_desloc(t5,t9,1).
temp_desloc(t6,t9,3).
temp_desloc(t7,t9,11).
temp_desloc(t8,t9,11).
temp_desloc(t9,t2,11).
temp_desloc(t9,t1,6).
temp_desloc(t9,t3,9).
temp_desloc(t9,t4,13).
temp_desloc(t9,t5,1).
temp_desloc(t9,t6,3).
temp_desloc(t9,t7,11).
temp_desloc(t9,t8,11).

%inicial_desloc(id tarefa,tempo de deslocacao)
inicial_desloc(t1,5).
inicial_desloc(t2,7).
inicial_desloc(t3,1).
inicial_desloc(t4,18).
inicial_desloc(t5,1).
inicial_desloc(t6,3).
inicial_desloc(t7,11).
inicial_desloc(t8,8).
inicial_desloc(t9,10).

%final_desloc(id tarefa,tempo de deslocacao)
final_desloc(t1,7).
final_desloc(t2,9).
final_desloc(t3,12).
final_desloc(t4,2).
final_desloc(t5,5).
final_desloc(t6,6).
final_desloc(t7,8).
final_desloc(t8,10).
final_desloc(t9,11).

%Parameterização
geracoes(3).
populacao(3).
prob_cruzamento(0.5).
prob_mutacao(0.25).
time:-	get_time(Now),
		FixedTime is Now + 10,  % Adiciona 10000 segundos ao tempo atual
		asserta(time_stop(FixedTime)).

%time_stop(10).

:- dynamic min_value/1.


:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic time_stop/1.
:-dynamic min_value/1.
:-dynamic melhor_sol/2.
:-dynamic taskRequest/6.
:-dynamic time_desloc/3.


%Plano de Atendimento Por Algoritmo Genetico

%gerar plano de atendimento
gera:-  gera_populacao(Pop),
		nl,
		write('Populacao: '),write(Pop),nl,nl,
        avalia_populacao(Pop,PopAv),
		write('Populacao Avaliada: '),write(PopAv),nl,nl,
        ordena_populacao(PopAv,PopOrd),
		retractall(min_value(_)),
		assertz(min_value(10000)),
		min_value(V1),
		avalia_min(PopOrd,0,Strike,V1),
        gera_geracao(0,PopOrd,Strike),!.


% Gera indivíduos - Teste - gera_individuo([tarefa(t1,entrega,a1,b1),tarefa(t6,entrega,a6,b6),tarefa(t3,vigilancia,a3,b3), tarefa(t2,desinfecao,a2,b2)],4,Ind).
gera_individuo([G],1,[G]):- !.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-   
							NumTemp is NumT + 1,
							random(1,NumTemp,N),
							retira(N,ListaTarefas,G,NovaLista),
							NumT1 is NumT-1,
							gera_individuo(NovaLista,NumT1,Resto).

% Gera uma populacao de individuos - Teste- gera_populacao(Pop).
gera_populacao(Pop):-   populacao(TamPop),
                        tarefas(NumT),
                        findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
                        gera_populacao(TamPop,ListaTarefas,NumT,Pop).
                        
gera_populacao(0,_,_,[]):-  !.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-  TamPop1 is TamPop-1,
                                                        gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
                                                        gera_individuo(ListaTarefas,NumT,Ind),
                                                        not(member(Ind,Resto)).

gera_populacao(TamPop,ListaTarefas,NumT,L):-    gera_populacao(TamPop,ListaTarefas,NumT,L).


%Retira o elemento de uma lista
retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-    N1 is N-1,
                                        retira(N1,Resto,G,Resto1).

% Avalia a populacao - Teste - avalia_populacao([tarefa(t1,entrega,a1,b1),tarefa(t6,entrega,a6,b6),tarefa(t3,vigilancia,a3,b3), tarefa(t2,desinfecao,a2,b2)],PopAv).
avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-	avalia_tempo_inicial(Ind,I),
												avalia(Ind,V1),
												V is V1+I,
												avalia_populacao(Resto,Resto1).

avalia_tempo_inicial([T|_],V):-	inicial_desloc(T,V).

avalia([H],V):-	final_desloc(H,V).

avalia([T,R|Resto],V):-	temp_desloc(T,R,Valor),
						avalia([R|Resto],V1),
						V is V1+Valor.


%Ordenar a populacao avaliada por ordem crescente de valor
ordena_populacao(PopAv,PopAvOrd):-  bsort(PopAv,PopAvOrd).

bsort([X],[X]):- !.
bsort([X|Xs],Ys):-  bsort(Xs,Zs),
                    btroca([X|Zs],Ys).

btroca([X],[X]):- !.
btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-  VX>VY,
                                    !,
                                    btroca([X*VX|L1],L2).
                                    
btroca([X|L1],[X|L2]):- btroca(L1,L2).


%Verificar se o tempo de execucao ja terminou- Teste - gera_geracao(0,1,[tarefa(t1,entrega,a1,b1),tarefa(t6,entrega,a6,b6),tarefa(t3,vigilancia,a3,b3), tarefa(t2,desinfecao,a2,b2)]).
gera_geracao(N,Pop,_):-	get_time(Now),
						time_stop(Time),
						Now>=Time,!,
						write('Tempo de execucao terminado'),nl,
						write('Geracao '), write(N), write(':'), nl, write(Pop), nl.

gera_geracao(N,[X*VX|_],10):-	write('Final: '),nl,
								write('Geracao '), write(N), write(':'), nl, write(X*VX), nl.

gera_geracao(N,[X,Y|Pop],Strike):-	write('Geracao '), write(N), write(':'), nl, write([X,Y|Pop]), nl,
									random_permutation([X,Y|Pop],Pop1),
									cruzamento(Pop1,NPop1),
									mutacao(NPop1,NPop),
									min_value(V),
									avalia_populacao(NPop, NPopAv),
									append([X,Y|Pop], NPopAv, NPopAv1),
									remove_duplicates(NPopAv1, NPopAvNoDupes),
									ordena_populacao(NPopAvNoDupes, NPopOrd),
									avalia_min(NPopOrd,Strike,Strike1,V),
									populacao(TamPop),
									NBest is TamPop//4,
									tam_pop_fraction(NBest,NBest1),
									list_transfer(NBest1,NPopBest,NPopLeft,NPopOrd),
									add_weights(NPopLeft,NPopWeighted),
									ordena_populacao(NPopWeighted,NPopWeightedOrd),
									remove_weights(NPopWeightedOrd,NPopOrd1),
									NTam is TamPop-NBest1,
									list_transfer(NTam,NPopBest1,_,NPopOrd1),
									append(NPopBest,NPopBest1,NPopFinal),
									ordena_populacao(NPopFinal,NPopFinal1),
									N1 is N+1,
									gera_geracao(N1,NPopFinal1,Strike1).


avalia_min([_*VX|_], _, Strike1,V):-	VX < V, !,
											retract(min_value(_)),
											asserta(min_value(VX)),
											Strike1 is 0.

avalia_min([_*VX|_], Strike, Strike1,V):-	VX >= V, !,
    										Strike1 is Strike + 1.


%Adicionar pesos
add_weights([],[]).

add_weights([H*V|NPop],[H*V*W1|NPopWeighted]):-	random(W),
												W1 is W*V,
												add_weights(NPop,NPopWeighted).

%Remover pesos
remove_weights([],[]).

remove_weights([H*_|NPop],[H|NPop1]):-	remove_weights(NPop,NPop1).

%Tamanho da populacao
tam_pop_fraction(0,N1):-	N1 is 1.

tam_pop_fraction(N,N1):-	N1 is N.


%Remove duplicados
remove_duplicates([], []).

remove_duplicates([Head | Tail], Result) :-	member(Head, Tail), !,
											remove_duplicates(Tail, Result).

remove_duplicates([Head | Tail], [Head | Result]) :-	remove_duplicates(Tail, Result).


%Transferir N elementos de uma lista para outra
list_transfer(N,NPopBest,NPopLeft,NPopOrd):-	length(NPopBest,N),
												append(NPopBest,NPopLeft,NPopOrd).

list_transfer(N,NPopBest,NPopLeft,NPopOrd):-	list_transfer(N,NPopBest,NPopLeft,NPopOrd).



%Gerar pontos de cruzamento
gerar_pontos_cruzamento(P1,P2):-	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-	tarefas(N),
									NTemp is N+1,
									random(1,NTemp,P11),
									random(1,NTemp,P21),
									P11\==P21,!,
									((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).

gerar_pontos_cruzamento1(P1,P2):-	gerar_pontos_cruzamento1(P1,P2).

% Cruzamento
cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-	gerar_pontos_cruzamento(P1,P2),
															prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
															((Pc =< Pcruz,!,
																cruzar(Ind1,Ind2,P1,P2,NInd1),
															cruzar(Ind2,Ind1,P1,P2,NInd2));
															(NInd1=Ind1,NInd2=Ind2)),
															cruzamento(Resto,Resto1).


% Preenche com h's
preencheh([],[]).

preencheh([_|R1],[h|R2]):-	preencheh(R1,R2).

% Sublista
sublista(L1,I1,I2,L):-	I1 < I2,!,
						sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-	!,	
								preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-	!,
								N3 is N2 - 1,
								sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-	N3 is N1 - 1,
									N4 is N2 - 1,
									sublista1(R1,N3,N4,R2).


% Rotação à direita
rotate_right(L,K,L1):-	tarefas(N),
						T is N - K,
						rr(T,L,L1).

rr(0,L,L):-	!.

rr(N,[X|R],R2):-	N1 is N - 1,
					append(R,[X],R1),
					rr(N1,R1,R2).


% Elimina elementos de uma lista
elimina([],_,[]):-	!.

elimina([X|R1],L,[X|R2]):-	not(member(X,L)),!,
							elimina(R1,L,R2).

elimina([_|R1],L,R2):-	elimina(R1,L,R2).

% Insere elementos de uma lista
insere([],L,_,L):-	!.
insere([X|R],L,N,L2):-	tarefas(T),
						((N>T,!,N1 is N mod T);N1 = N),
						insere1(X,N1,L,L1),
						N2 is N + 1,
						insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-	N1 is N-1,
							insere1(X,N1,L,L1).


% Cruzamento
cruzar(Ind1,Ind2,P1,P2,NInd11):-	sublista(Ind1,P1,P2,Sub1),
									tarefas(NumT),
									R is NumT-P2,
									rotate_right(Ind2,R,Ind21),
									elimina(Ind21,Sub1,Sub2),
									P3 is P2 + 1,
									insere(Sub2,Sub1,P3,NInd1),
									eliminah(NInd1,NInd11).

% Elimina h's
eliminah([],[]).

eliminah([h|R1],R2):-	!,
						eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-	eliminah(R1,R2).


% Mutação
mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-	prob_mutacao(Pmut),
									random(0.0,1.0,Pm),
									((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
									mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-	gerar_pontos_cruzamento(P1,P2),
						mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-	!, 
										P21 is P2-1,
										mutacao23(G1,P21,Ind,G2,NInd).

mutacao22([G|Ind],P1,P2,[G|NInd]):-	P11 is P1-1, 
									P21 is P2-1,
									mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-	P1 is P-1,
										mutacao23(G1,P1,Ind,G2,NInd).




% Plano de Atendimento Por Sequencia de execução de tarefas e escolha da mais rapida
% Teste - plano_atendimento(robot1, Ts, Plano).
plano_atendimento(R, Ts, MelhorPlano) :-	atribuir_tarefas(R, Ts),
											asserta(melhor_sol(_, 10000)),
											nl, write('Gerando planos...'), nl,
											gerar_planos(Ts, MelhorPlano),
											melhor_sol(MelhorPlano, _), !.

% Gera planos utilizando permutation de forma controlada
gerar_planos(Ts, _) :-	permutation(Ts, Plano),
						nl, write('Plano gerado: '), write(Plano), nl,
						melhor_cam_atendimento(Plano),
						fail.
						
gerar_planos(_, _).

				
% Analisa um plano para ver se é melhor do que o melhor plano atual.
% Calcula o tempo total para o plano, incluindo o tempo inicial de deslocamento.
% Se o tempo total for menor do que o tempo do melhor plano atual, atualiza o melhor plano.
melhor_cam_atendimento(Plano):-	calculo_tempo(Plano,Tempo),
								melhor_sol(_,T),
								obter_melhor_tempo(Tempo,T,Plano),
								melhor_sol(_, _).

%Tempo total para o plano
calculo_tempo(Plano, Tempo):-  	analisar_tempo(Plano,Tempo1),
								nth0(0,Plano,I),
								inicial_desloc(I,Tempo2),
								tempo_entre_tarefas(Plano,Tempo3),
								Tempo is Tempo1+Tempo2+Tempo3.

%Calcula tempo entre tarefas
tempo_entre_tarefas([_],0).

tempo_entre_tarefas([T1,T2|Resto],Tempo):-	temp_desloc(T1,T2,Tempo1),
											tempo_entre_tarefas([T2|Resto],Tempo2),
											Tempo is Tempo1+Tempo2.

obter_melhor_tempo(Tempo,T,Plano):-  	Tempo<T,!,
						retract(melhor_sol(_,_)),
						asserta(melhor_sol(Plano,Tempo)).

obter_melhor_tempo(Tempo,T,_):-  	Tempo>=T,!,
					true.

% Se o plano consiste em uma única tarefa, o tempo para o plano é o tempo de deslocamento final para a tarefa.
analisar_tempo([T],Tempo):- 
	final_desloc(T,C),!,
	Tempo is C.

analisar_tempo([_|Resto], Tempo):- analisar_tempo(Resto,Tempo).

% Se o plano consiste em mais de uma tarefa, o tempo para o plano é a soma do tempo de deslocamento entre a primeira e a segunda tarefa
% e o tempo para o resto do plano.
analisar_tempo([T1,T2|R],Tempo):-	
	analisar_tempo([T2|R],Tempo2),
	time_desloc(T1,T2,Tempo1),
	Tempo is Tempo2+Tempo1.


atribuir_tarefas(R, Ts) :-
    robotEst(R, TipoRobot),
    findall(I, (tarefa(I, TipoTarefa, _, _), robot_type(TipoRobot, TipoTarefa, _)), Ts).