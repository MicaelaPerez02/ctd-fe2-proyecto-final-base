## Información general
Este repositorio contiene el código que desarrollé para el examen final de Frontend II. La consigna de este examen consistió en desarrollar una serie de Test en React en un apartado que obtiene citas de Los Simpsons de manera aleatoria o filtrada por personaje, aplicar Styled Components en un apartado de Info de los personajes y aplicar principios SOLID en un apartado de Notivias. Para cumplir con la consigna, se debían seguir una serie de requisitos y condiciones de aprobación que se detallan a continuación.

## Requisitos y condiciones de aprobación
Los requisitos y condiciones de aprobación que debí cumplir para aprobar el examen son los siguientes:

## Requisitos
Realizar un fork del proyecto provisto y trabajar de forma individual.
Cumplir con todas las funcionalidades obligatorias.
Desarrollar el proyecto utilizando TypeScript como lenguaje.
Utilizar las librerías permitidas en la consigna y/o el archivo README que se encuentra dentro del repositorio.
Desarrollar tests unitarios para la primera sección utilizando Jest y React Testing Library, y utilizando MSW para interceptar los request y mockear una respuesta.
Utilizar la librería Styled Components para dar estilos a componentes y manejar estilos dinámicos.
Aplicar al menos 1 principio SOLID para resolver la primera consigna, explicando en un comentario en qué parte del código se puede ver dicha aplicación.
Condiciones de aprobación
El proyecto deberá realizarse sobre la base del template entregado. No se aceptarán proyectos que se hayan realizado sin respetar dicho requerimiento.
Cualquier funcionalidad que sea implementada utilizando una librería distinta a las permitidas, no se considerará realizada.
Se espera que el proyecto cuente con un coverage de al menos 50% como condición mínima de aprobación.
Los siguientes aspectos son extras al requisito mínimo de aprobación que serán tenidos en cuenta para aumentar la nota final, siempre y cuando su implementación sea correcta:
TypeScript: se valorará el uso de TypeScript para el tipado de los componentes y funciones que desarrollen lógica reutilizable, y la reutilización de tipos comunes que se repiten a lo largo del código.
Documentación: se valorará el correcto uso de la documentación en todas las funciones y componentes en caso de ser necesario.
Validaciones: se valorará el agregado de validaciones de flujos alternativos al normal y el manejo de errores en las distintas funcionalidades implementadas.
Testing unitario y coverage: se valorará el correcto uso del testing unitario y el incremento del porcentaje de cobertura de código (coverage) más allá del 50%.
Buenas Prácticas: se prestará especial atención al uso de buenas prácticas, principios SOLID, reutilización de componentes y funcionalidades comunes, y renderizado dinámico.

## Funcionalidades Obligatorias

La aplicación cuenta con una sección que permite obtener citas de Los Simpsons. Las funcionalidades obligatorias son las siguientes:

Paso 1 - Cita Simpsons
En este paso, se pide crear un custom render agregando el provider de Redux para poder disparar las acciones. 
Utilizar MSW o alguna otra librería para interceptar los request y mockear una respuesta. No se permite mockear el método fetch.
Desarrollar test de integración sobre el componente “Quotes”, evaluando los distintos test cases que contemplen los distintos flujos de comportamiento.

Paso 2 - Styled Components:
En este paso, se pide agregar estilos a la sección de noticias utilizando la librería Styled Components. Es importante tener en cuenta que los estilos dinámicos también deberán manejarse mediante esta librería. Se espera que se utilicen buenas prácticas de CSS y se preste especial atención a la reutilización de componentes y funcionalidades comunes.

Paso 3 - Noticias:
En este caso, el requerimiento consiste en refactorizar el código aplicando los principios y buenas prácticas que hemos visto a lo largo de la cursada. En especial, se espera que puedas aplicar los principios SOLID durante el proceso de refactorización. A tal fin, está permitido crear nuevos archivos dentro de la carpeta “news”, en caso de que lo consideres necesario para extraer cierta lógica del código. Sin embargo, debe tenerse en cuenta que solo debe trabajarse sobre el archivo Noticias.jsx. No deberá modificarse el contenido de los archivos fakeRest.ts y styled.ts, ya que ello no forma parte de la consigna.
