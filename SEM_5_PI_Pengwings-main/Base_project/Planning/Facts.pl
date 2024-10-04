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


:- dynamic building/1.
:- dynamic floor/2.
:- dynamic passage/4.
:- dynamic elevator/2.
:- dynamic liga/2.
:- dynamic task/4.

carrega_factos :-
    Flag = flag(false),
    (catch(request_building(), error(socket_error(wsaeconnrefused,'Connection refused'),_), (write('Failed to connect to the server at http://127.0.0.1:3000/api/building.\n'), nb_setarg(1, Flag, true), fail)) ; true),
    (catch(request_floor(), error(socket_error(wsaeconnrefused,'Connection refused'),_), (write('Failed to connect to the server at http://127.0.0.1:3000/api/floor/all.\n'), nb_setarg(1, Flag, true), fail)) ; true),
    (catch(request_hallway(), error(socket_error(wsaeconnrefused,'Connection refused'),_), (write('Failed to connect to the server at http://127.0.0.1:3000/api/passages/all.\n'), nb_setarg(1, Flag, true), fail)) ; true),
    (catch(request_elevator(), error(socket_error(wsaeconnrefused,'Connection refused'),_), (write('Failed to connect to the server at http://127.0.0.1:3000/api/elevator/all.\n'), nb_setarg(1, Flag, true), fail)) ; true),
    %(catch(request_task(_), error(socket_error(wsaeconnrefused,'Connection refused'),_), (write('Failed to connect to the server at https://localhost:7297/api/Assignment/accept.\n'), nb_setarg(1, Flag, true), fail)) ; true),
    (arg(1, Flag, true) -> nl, write('This may be because the Node.js and/or .NET servers are down. Please try stopping the server with the stop_server rule, start the Node.js and .NET servers, and then try again.\n') , nl,write(''); true).


% Catch all buildings from database
request_building():-  retractall(building(_)),
                    http_open('http://127.0.0.1:3000/api/building', ResJSON, [cert_verify_hook(cert_accept_any)]),
                    json_read_dict(ResJSON, ResObj),
                    extract_building(ResObj, ResVal),
                    create_building(ResVal).

extract_building([], []).
extract_building([H|T], [H.code|L]):-  extract_building(T, L).

create_building([]).
create_building([Code|T]):-
    (   catch(atom_number(Code, NumberCode), _, fail)  % Try to convert the string to a number
    ->  assertz(building(NumberCode))  % If successful, insert the number into the knowledge base
    ;   atom_string(AtomCode, Code),   % If not, convert the string to an atom
        assertz(building(AtomCode))    % and insert the atom into the knowledge base
    ),
    create_building(T).


% Catch all floors from database
request_floors():-  
    retractall(floor(_,_)),
    %writeln('Opening HTTP connection...'),
    http_open('http://127.0.0.1:3000/api/floor/all', ResJSON, [cert_verify_hook(cert_accept_any)]),
    %writeln('HTTP connection opened. Reading JSON...'),
    json_read_dict(ResJSON, ResObj),
    %writeln('JSON read. Extracting floors...'),
    extract_floors(ResObj.get('_value'), ResVal),  % Extract floors from the '_value' field
    %writeln('Floors extracted. Creating floors...'),
    group_floors(ResVal, PisosGrupo),
    create_floors(PisosGrupo).
    %writeln('Floors created.').


% Extract floors from the response object
extract_floors([], []):-!.
extract_floors([H|T], [[H.building, H.floorNumber]|T2]):-  extract_floors(T, T2).

group_floors(Pisos, PisosGrupo) :-
    findall([Edificio, NumeroPisos], 
            (bagof(NumeroPiso, member([Edificio, NumeroPiso], Pisos), NumeroPisos)),
            PisosGrupo).

% Create floors in the knowledge base
create_floors([]).
create_floors([[Edificio, Pisos]|T]):-
    %atom_number(Pisos, NumberPisos),  % Convert the string to a number
    (   catch(atom_number(Edificio, NumberEdificio), _, fail)  % Try to convert the string to a number
    ->  assertz(floor(NumberEdificio, Pisos))  % If successful, insert the number into the knowledge base
    ;   atom_string(AtomEdificio, Edificio),   % If not, convert the string to an atom
        assertz(floor(AtomEdificio, Pisos))    % and insert the atom into the knowledge base
    ),
    create_floors(T).


% Catch all hallways from database (FIX THIS IN BACKEND)
request_hallways():-    retractall(hallway(_,_,_,_)),
                        http_open('http://127.0.0.1:3000/api/passages/all', ResJSON, [cert_verify_hook(cert_accept_any)]),
                        json_read_dict(ResJSON, ResObj),
                        writeln(ResObj),
                        extract_hallways(ResObj.get('_value'), ResVal),
                        create_hallways(ResVal).

extract_hallways([], []).
extract_hallways([H|T1], [[H.building1Id, H.building2Id, H.floor1Id, H.floor2Id]|T2]):- extract_hallways(T1, T2).

create_hallways([]).
create_hallways([[EdificioA, EdificioB, PisoA, PisoB]|T]):-  assertz(passage(EdificioA, EdificioB, PisoA, PisoB)),
                                                            assertz(liga(EdificioA, EdificioB)),
                                                            create_hallways(T).

% Catch all elevators from database
request_elevators():-  
    retractall(elevator(_,_)),
    http_open('http://127.0.0.1:3000/api/elevator/all', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON, ResObj),
    extract_elevators(ResObj, ResVal),
    create_elevators(ResVal).

extract_elevators([], []).
extract_elevators([H|T], [[H.building, H.floors]|T2]):- extract_elevators(T, T2).

create_elevators([]).
create_elevators([[Edificio, PisosServidos|_]|T]):-  assertz(elevator(Edificio, PisosServidos)),
                                                    create_elevators(T).

request_task(Res):- 
    retractall(task(_,_,_,_)),
    http_open('https://localhost:7297/api/Assignments/accept',ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON, ResObj),
    assert_tasks(ResObj, Res),
    close(ResJSON).
                
assert_tasks([], []).
assert_tasks([H|T], [task(Id, Type, InitialPoint, LastPoint)|L]) :-
    ( catch(atom_number(H.name, NumberId), _, fail)
        ->  Id = NumberId
        ;   atom_string(AtomId, H.name),
            Id = AtomId
    ),
    ( catch(atom_number(H.type, NumberType), _, fail)
        ->  Type = NumberType
        ;   atom_string(AtomType, H.type),
            Type = AtomType
    ),
    ( catch(atom_number(H.startPoint, NumberInitialPoint), _, fail)
        ->  InitialPoint = NumberInitialPoint
        ;   atom_string(AtomInitialPoint, H.startPoint),
            InitialPoint = AtomInitialPoint
    ),
    ( catch(atom_number(H.endPoint, NumberLastPoint), _, fail)
        ->  LastPoint = NumberLastPoint
        ;   atom_string(AtomLastPoint, H.endPoint),
            LastPoint = AtomLastPoint
    ),
    assertz(task(Id, Type, InitialPoint, LastPoint)),
    assert_tasks(T, L).