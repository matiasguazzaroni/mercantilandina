# Mercantilandina

El proyecto fue realizado con:
    - Angular 9
    - Angular Material 9

El motivo por el cual utilicé Angular Material fue para resolver más rápidamente algunos componentes de L&F y acelerar el proceso de entrega del trabajo.

## Scss

Se utilizó Scss para manipular y tener un mayor control del tema que tendrá la aplicación. En este caso se utilizaron los colores de Mercantil Andina.
Los colores se encuentran definidos dentro del archivo scss/_colors.scss y es importado en diferentes archivos dentro del aplicativo, como el archivo styles.scss donde se customiza el tema a utilizarse.

## Environment

Allí se definieron los endpoints al ambiente de QA para consumir los servicios.

## Stepper Component

Componente que contiene la lógica del comportamiento del #Wizard. El objetivo es que dicho componente pueda ser reutilizado en otras pantallas de la aplicación. 
Como parámetro de entrada recibe un Array<Step> que contiene la información de cada Step para que este pueda ser renderizado. Esta información es:
            - ClassName del componente
            - String del label
            - Boolean: Flag opcional para controlar la ejecución, de en este caso, el hook ngOnInit()

Contiene 2 métodos para la navegación entre componentes: 
        - handleNext el cual es un callback que se suscribe al Output onNext de cada uno de los componentes y su función es la de avanzar al siguiente step en caso de haber.
        
        - handleBefore el cual es un callback que se suscribe al Output onBefore de cada uno de los componentes y su función es la de retroceder al previo step en caso de haber.

## Personal Component

Componente utilizado para obtener los datos personales del usuario (Primer step). 
Contiene 1 variable (onNext) Output el cual es una instancia de la clase EventEmitter. El objetivo es que cuando se desee avanzar al siguiente Step se ejecute el método emit() de dicha clase para que el StepperComponent pueda controlarlo.

Se utilizó un formulario de tipo Reactive Form. Se implementaron diversas directivas de validación que se encuentran en la ruta directives/validators.

Para controlar si el valor ingresado para el campo usuario ya está en uso o no, en el método ngOnInit de dicho componente utilizamos las funciones de debounce y distinctUntilChanged para controlar cuando el usuario ha dejado de escribir y para detectar si se han realizado cambios, correspondientemente. Nos suscribimos a los cambios y ante cada uno de ellos realizamos la invocación a la API que valida la existencia del user.

## Vehicle Component

Segundo componente para el Stepper. En él se encuentra toda la información asociada a los vehículos.
Si alguno de los servicios de listados no retorna información, como puede ser el servicio que trae los modelos y el de las versiones, se mostrará un campo de texto libre.

## Coverage Component

Componente utilizado para controlar la selección de un seguro por parte del usuario. Se mostrarán los seguros ordenados por rating en un diseño de cards para facilitar mostrar toda la información posible.

## Resume Component

Componente que muestra un resumen de la información que el usuario fue obteniendo a lo largo del proceso.

La información de cada uno de los componentes con los que el usuario fue completando los campos es almacenada en la sessionStorage del browser de modo tal de persistir la información a pesar del refresco de pantalla. Esta información es obtenida a través del servicio sharedService el cual es inyectado como dependencia y partir de allí se obtienen los datos.

## Success Component

Componente que le notifica al usuario que el proceso ha sido efectuado exitosamente.

## PassowrdStrength Component

Componente reutilizable que contiene la lógica a determinar si la password es "fuerte" o "debil". Como output emite un evento que retorna el Score a modo de ser utilizado como validación para la función "passwordValidator".

## HttpInterceptor Service

Este servicio es inyectado como un provider dentro de la aplicación con el objetivo de capturar cada uno de los requests que se realicen y de, a raíz de ello, mostrar un spinner que le indique al usuario que hay un proceso en curso.

## Documento Pipe

Se utiliza para darle formato al DNI, el objetivo es que a medida que el usuario ingresa el DNI este vaya tomando formato. Si el DNI comienza con 1 solo dígito (7), se debe anteponer un 0 de modo tal que quede 07 millones..

## Session Storage

Como mencionaba en uno de los puntos anteriores, utilicé esta tecnología para almacenar la información de cada uno de los formularios para no perder la información que el usuario había cargado al momento de refrescar la página. La idea es permitirle al usuario permanecer en el mismo estado en el que se encontraba luego de un refresh. 
Cada componente tiene una variable de clase la cual hace referencia a su respectiva "key" en la session storage.
La lógica de guardado/lectura/destrucción de datos de la sessionStorage se encuentra en el servicio SharedService

## Directives Validators

Funciones customs reutilizables que se utilizan como "Validators" para validar inputs.

## Utils Service

Servicio donde se encuentran funciones customs para reutilizar y la definición de los regex.

## PWA

A la aplicación se le añadió los archivos manifest, ngsw-config.json y se registro el service-worker en el archivo appmodule.ts
No he profundizado más en el tema por cuestiones de tiempo.