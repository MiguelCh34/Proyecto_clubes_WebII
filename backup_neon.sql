-- Limpiar base de datos
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO neondb_owner;
GRANT ALL ON SCHEMA public TO public;

-- Crear tablas
CREATE TABLE public.actividad (
    "ID_Actividad" integer NOT NULL,
    "Nombre" character varying(150) NOT NULL,
    "Descripcion" text,
    "Fecha" timestamp without time zone NOT NULL,
    "Lugar" character varying(200),
    "ID_Club" integer NOT NULL,
    "ID_Estado" integer NOT NULL,
    "ID_Usuario" integer NOT NULL
);

CREATE SEQUENCE public."actividad_ID_Actividad_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."actividad_ID_Actividad_seq" OWNED BY public.actividad."ID_Actividad";

CREATE TABLE public.actividades_realizadas (
    "ID_Participacion" integer NOT NULL,
    "ID_Estudiante" integer NOT NULL,
    "ID_Actividad" integer NOT NULL,
    "ID_Roles" integer NOT NULL,
    "ID_Estado" integer NOT NULL
);

CREATE SEQUENCE public."actividades_realizadas_ID_Participacion_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."actividades_realizadas_ID_Participacion_seq" OWNED BY public.actividades_realizadas."ID_Participacion";

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);

CREATE TABLE public.categoria (
    "ID_Categoria" integer NOT NULL,
    "Nombre_Categoria" character varying(100) NOT NULL
);

CREATE SEQUENCE public."categoria_ID_Categoria_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."categoria_ID_Categoria_seq" OWNED BY public.categoria."ID_Categoria";

CREATE TABLE public.club (
    "ID_Club" integer NOT NULL,
    "Nombre" character varying(150) NOT NULL,
    "Descripcion" text,
    "Tipo" character varying(100),
    "Duracion" character varying(50),
    "ID_Sede" integer NOT NULL,
    "ID_Facultad" integer,
    "ID_Estado" integer NOT NULL,
    "ID_Usuario" integer NOT NULL
);

CREATE SEQUENCE public."club_ID_Club_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."club_ID_Club_seq" OWNED BY public.club."ID_Club";

CREATE TABLE public.estado (
    "ID_Estado" integer NOT NULL,
    "Nombre_estado" character varying(50) NOT NULL
);

CREATE SEQUENCE public."estado_ID_Estado_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."estado_ID_Estado_seq" OWNED BY public.estado."ID_Estado";

CREATE TABLE public.facultad (
    "ID_Facultad" integer NOT NULL,
    "Nombre" character varying(150) NOT NULL
);

CREATE SEQUENCE public."facultad_ID_Facultad_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."facultad_ID_Facultad_seq" OWNED BY public.facultad."ID_Facultad";

CREATE TABLE public.inscripcion (
    "ID_Inscripcion" integer NOT NULL,
    "ID_Persona" integer NOT NULL,
    "ID_Club" integer NOT NULL,
    "ID_Roles" integer NOT NULL,
    "Fecha_Ingreso" timestamp without time zone,
    "ID_Estado" integer NOT NULL,
    "ID_Usuario" integer NOT NULL
);

CREATE SEQUENCE public."inscripcion_ID_Inscripcion_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."inscripcion_ID_Inscripcion_seq" OWNED BY public.inscripcion."ID_Inscripcion";

CREATE TABLE public.persona (
    "ID_Persona" integer NOT NULL,
    "Nombre" character varying(100) NOT NULL,
    "Apellido" character varying(100) NOT NULL,
    "Carrera" character varying(150),
    "Correo_institucional" character varying(150),
    "Cantidad" integer,
    "Edad" integer,
    "Cedula" character varying(20),
    "Telefono" character varying(20),
    "ID_Estado" integer NOT NULL,
    "ID_Usuario" integer NOT NULL,
    "ID_Rol" integer,
    foto_perfil character varying(500),
    "Foto_Perfil" character varying(500)
);

CREATE SEQUENCE public."persona_ID_Persona_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."persona_ID_Persona_seq" OWNED BY public.persona."ID_Persona";

CREATE TABLE public.roles (
    "ID_Roles" integer NOT NULL,
    "Nombre_Rol" character varying(50) NOT NULL
);

CREATE SEQUENCE public."roles_ID_Roles_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."roles_ID_Roles_seq" OWNED BY public.roles."ID_Roles";

CREATE TABLE public.sede (
    "ID_Sede" integer NOT NULL,
    "Ubicacion" character varying(200) NOT NULL
);

CREATE SEQUENCE public."sede_ID_Sede_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."sede_ID_Sede_seq" OWNED BY public.sede."ID_Sede";

CREATE TABLE public.usuario (
    "ID_Usuario" integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(120) NOT NULL,
    password_hash character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'usuario'::character varying
);

CREATE SEQUENCE public."usuario_ID_Usuario_seq"
    AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public."usuario_ID_Usuario_seq" OWNED BY public.usuario."ID_Usuario";

-- Configurar defaults
ALTER TABLE ONLY public.actividad ALTER COLUMN "ID_Actividad" SET DEFAULT nextval('public."actividad_ID_Actividad_seq"'::regclass);
ALTER TABLE ONLY public.actividades_realizadas ALTER COLUMN "ID_Participacion" SET DEFAULT nextval('public."actividades_realizadas_ID_Participacion_seq"'::regclass);
ALTER TABLE ONLY public.categoria ALTER COLUMN "ID_Categoria" SET DEFAULT nextval('public."categoria_ID_Categoria_seq"'::regclass);
ALTER TABLE ONLY public.club ALTER COLUMN "ID_Club" SET DEFAULT nextval('public."club_ID_Club_seq"'::regclass);
ALTER TABLE ONLY public.estado ALTER COLUMN "ID_Estado" SET DEFAULT nextval('public."estado_ID_Estado_seq"'::regclass);
ALTER TABLE ONLY public.facultad ALTER COLUMN "ID_Facultad" SET DEFAULT nextval('public."facultad_ID_Facultad_seq"'::regclass);
ALTER TABLE ONLY public.inscripcion ALTER COLUMN "ID_Inscripcion" SET DEFAULT nextval('public."inscripcion_ID_Inscripcion_seq"'::regclass);
ALTER TABLE ONLY public.persona ALTER COLUMN "ID_Persona" SET DEFAULT nextval('public."persona_ID_Persona_seq"'::regclass);
ALTER TABLE ONLY public.roles ALTER COLUMN "ID_Roles" SET DEFAULT nextval('public."roles_ID_Roles_seq"'::regclass);
ALTER TABLE ONLY public.sede ALTER COLUMN "ID_Sede" SET DEFAULT nextval('public."sede_ID_Sede_seq"'::regclass);
ALTER TABLE ONLY public.usuario ALTER COLUMN "ID_Usuario" SET DEFAULT nextval('public."usuario_ID_Usuario_seq"'::regclass);

-- Insertar datos
INSERT INTO public.actividad ("ID_Actividad", "Nombre", "Descripcion", "Fecha", "Lugar", "ID_Club", "ID_Estado", "ID_Usuario") VALUES
(2, 'Taller de Arduino', 'Introducción a electrónica digital', '2025-05-15 10:00:00', 'Laboratorio 204', 8, 1, 1);

INSERT INTO public.alembic_version (version_num) VALUES ('d8f9c2c7d6ee');

INSERT INTO public.club ("ID_Club", "Nombre", "Descripcion", "Tipo", "Duracion", "ID_Sede", "ID_Facultad", "ID_Estado", "ID_Usuario") VALUES
(8, 'Club de Robótica', 'Actividades de electrónica y programación.', 'Tecnológico', '6 meses', 1, 1, 1, 1),
(59, 'Club de IA', 'Todo referente a la IA', 'Tecnologia', '2 meses', 4, 6, 1, 1);

INSERT INTO public.estado ("ID_Estado", "Nombre_estado") VALUES
(1, 'Activo'),
(4, 'Inactivo');

INSERT INTO public.facultad ("ID_Facultad", "Nombre") VALUES
(1, 'Ingeniería'),
(2, 'Ciencias Sociales'),
(4, 'Salud'),
(5, 'Ciencias Económicas'),
(6, 'Informatica');

INSERT INTO public.inscripcion ("ID_Inscripcion", "ID_Persona", "ID_Club", "ID_Roles", "Fecha_Ingreso", "ID_Estado", "ID_Usuario") VALUES
(2, 4, 8, 5, '2026-01-20 16:15:52.803547', 1, 7),
(3, 3, 8, 5, '2026-01-20 22:29:08.727366', 1, 10),
(4, 3, 59, 5, '2026-01-20 23:47:06.875147', 1, 10);

INSERT INTO public.persona ("ID_Persona", "Nombre", "Apellido", "Carrera", "Correo_institucional", "Cantidad", "Edad", "Cedula", "Telefono", "ID_Estado", "ID_Usuario", "ID_Rol", foto_perfil, "Foto_Perfil") VALUES
(2, 'Luis', 'García', 'Informática', 'lgarcia@example.com', 1, 21, '1105698734', '0987654321', 1, 1, NULL, NULL, NULL),
(3, 'Manuel', 'Pachay', 'Tecnologia de la informacion', 'manuel@ejemplo.com', 1, NULL, NULL, NULL, 1, 10, 2, 'https://api.dicebear.com/7.x/bottts/svg?seed=Robot1', NULL),
(4, 'Miguel', 'Chiriboga', NULL, 'miguel@ejemplo.com', NULL, NULL, NULL, NULL, 1, 9, NULL, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin');

INSERT INTO public.roles ("ID_Roles", "Nombre_Rol") VALUES
(2, 'Coordinador'),
(3, 'Estudiante'),
(5, 'Miembro');

INSERT INTO public.sede ("ID_Sede", "Ubicacion") VALUES
(1, 'Campus La Libertad'),
(4, 'Campus nuevo');

INSERT INTO public.usuario ("ID_Usuario", nombre, email, password_hash, rol) VALUES
(3, 'Alejandro', 'Alejandro@test.com', 'scrypt:32768:8:1$s9pdeFU7wVOCgrpS$834639a390f06d8a1529d49a6ae032339b3c0ea8c1fb2018ed73a7ac37d8fb5babee6ffc06cf0294f76ffd7e180165fbcc508013bc05a287a5e09a51d8e13c81', 'usuario'),
(4, 'Admin', 'admin@admin.com', 'TEMPORAL', 'usuario'),
(1, 'Nuevo nombre', 'admin1@test.com', 'scrypt:32768:8:1$MJa5y5EHD0jGGG4o$0e9ed259f3477fd5a6184c767200fab73956d597a97a63a2686911b88ecda19ad28d38f6b28c3aafaafa2523e7a19cb19f5f41d3803fc0624d5b750386a3e2d3', 'usuario'),
(5, 'Chiriboga', 'miguelCH@test.com', 'scrypt:32768:8:1$1FFe2vE7J3WYfIbk$89c210278b776282972d0693c9c73c4d7b5f1a263f48df84b850fff3b5c38e2bec2d6d081d04b8e1a824f28641798c6d72df48a3a4da79fcfd4c9b189f580d0c', 'usuario'),
(6, 'Casanova', 'casanova@test.com', 'scrypt:32768:8:1$A3IP5gU5Lg0MFjky$e7d661b05a5aabbb70c7dab57a89b86ed48a14274a76240f22becdc02d01ffc893e3381e4f53ad76bd25316753bc68ecf8c6ba64af3e95197f1253d3e8a6d354', 'usuario'),
(7, 'Pinto', 'pinto@test.com', 'scrypt:32768:8:1$iAvAmuKAuWumoYbg$f46ff3e377f91a4d324103850ac368b6e0c91dbd92a7353847036853fceeb2494900236eae33581faad23370476b933c19b0ab69cfb02691f42a5826abca46c0', 'usuario'),
(9, 'Miguel Chiriboga', 'miguel@ejemplo.com', 'scrypt:32768:8:1$TxzqJz88zjQQa2gP$411eb78e7df245cccd1009e7627996c17638ecfb4286dfc26112dfa42bff83e44c039e51df6d3655976361a81942edcc2bb5809ac01d2b801cee24b34723c214', 'admin'),
(10, 'Manuel Pachay', 'manuel@ejemplo.com', 'scrypt:32768:8:1$3OytpTOckX8e2Res$122df70154297569861eb340b1fe1723adff060c3ecbfab9500b25cbd91f850248ec8980e759f746584bc9619e55aed28d69e4af9977ef843d020ae3e920b8d2', 'usuario');

-- Actualizar secuencias
SELECT pg_catalog.setval('public."actividad_ID_Actividad_seq"', 3, true);
SELECT pg_catalog.setval('public."actividades_realizadas_ID_Participacion_seq"', 1, true);
SELECT pg_catalog.setval('public."categoria_ID_Categoria_seq"', 2, true);
SELECT pg_catalog.setval('public."club_ID_Club_seq"', 59, true);
SELECT pg_catalog.setval('public."estado_ID_Estado_seq"', 4, true);
SELECT pg_catalog.setval('public."facultad_ID_Facultad_seq"', 6, true);
SELECT pg_catalog.setval('public."inscripcion_ID_Inscripcion_seq"', 4, true);
SELECT pg_catalog.setval('public."persona_ID_Persona_seq"', 7, true);
SELECT pg_catalog.setval('public."roles_ID_Roles_seq"', 5, true);
SELECT pg_catalog.setval('public."sede_ID_Sede_seq"', 6, true);
SELECT pg_catalog.setval('public."usuario_ID_Usuario_seq"', 11, true);

-- Agregar constraints
ALTER TABLE ONLY public.actividad ADD CONSTRAINT actividad_pkey PRIMARY KEY ("ID_Actividad");
ALTER TABLE ONLY public.actividades_realizadas ADD CONSTRAINT actividades_realizadas_pkey PRIMARY KEY ("ID_Participacion");
ALTER TABLE ONLY public.alembic_version ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
ALTER TABLE ONLY public.categoria ADD CONSTRAINT "categoria_Nombre_Categoria_key" UNIQUE ("Nombre_Categoria");
ALTER TABLE ONLY public.categoria ADD CONSTRAINT categoria_pkey PRIMARY KEY ("ID_Categoria");
ALTER TABLE ONLY public.club ADD CONSTRAINT club_pkey PRIMARY KEY ("ID_Club");
ALTER TABLE ONLY public.estado ADD CONSTRAINT "estado_Nombre_estado_key" UNIQUE ("Nombre_estado");
ALTER TABLE ONLY public.estado ADD CONSTRAINT estado_pkey PRIMARY KEY ("ID_Estado");
ALTER TABLE ONLY public.facultad ADD CONSTRAINT facultad_pkey PRIMARY KEY ("ID_Facultad");
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT inscripcion_pkey PRIMARY KEY ("ID_Inscripcion");
ALTER TABLE ONLY public.persona ADD CONSTRAINT "persona_Cedula_key" UNIQUE ("Cedula");
ALTER TABLE ONLY public.persona ADD CONSTRAINT "persona_Correo_institucional_key" UNIQUE ("Correo_institucional");
ALTER TABLE ONLY public.persona ADD CONSTRAINT persona_pkey PRIMARY KEY ("ID_Persona");
ALTER TABLE ONLY public.roles ADD CONSTRAINT "roles_Nombre_Rol_key" UNIQUE ("Nombre_Rol");
ALTER TABLE ONLY public.roles ADD CONSTRAINT roles_pkey PRIMARY KEY ("ID_Roles");
ALTER TABLE ONLY public.sede ADD CONSTRAINT sede_pkey PRIMARY KEY ("ID_Sede");
ALTER TABLE ONLY public.actividades_realizadas ADD CONSTRAINT uq_estudiante_actividad UNIQUE ("ID_Estudiante", "ID_Actividad");
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT uq_persona_club UNIQUE ("ID_Persona", "ID_Club");
ALTER TABLE ONLY public.usuario ADD CONSTRAINT usuario_email_key UNIQUE (email);
ALTER TABLE ONLY public.usuario ADD CONSTRAINT usuario_pkey PRIMARY KEY ("ID_Usuario");

-- Agregar foreign keys
ALTER TABLE ONLY public.actividad ADD CONSTRAINT "actividad_ID_Club_fkey" FOREIGN KEY ("ID_Club") REFERENCES public.club("ID_Club");
ALTER TABLE ONLY public.actividad ADD CONSTRAINT "actividad_ID_Estado_fkey" FOREIGN KEY ("ID_Estado") REFERENCES public.estado("ID_Estado");
ALTER TABLE ONLY public.actividad ADD CONSTRAINT "actividad_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES public.usuario("ID_Usuario");
ALTER TABLE ONLY public.actividades_realizadas ADD CONSTRAINT "actividades_realizadas_ID_Actividad_fkey" FOREIGN KEY ("ID_Actividad") REFERENCES public.actividad("ID_Actividad");
ALTER TABLE ONLY public.actividades_realizadas ADD CONSTRAINT "actividades_realizadas_ID_Estado_fkey" FOREIGN KEY ("ID_Estado") REFERENCES public.estado("ID_Estado");
ALTER TABLE ONLY public.actividades_realizadas ADD CONSTRAINT "actividades_realizadas_ID_Estudiante_fkey" FOREIGN KEY ("ID_Estudiante") REFERENCES public.persona("ID_Persona");
ALTER TABLE ONLY public.actividades_realizadas ADD CONSTRAINT "actividades_realizadas_ID_Roles_fkey" FOREIGN KEY ("ID_Roles") REFERENCES public.roles("ID_Roles");
ALTER TABLE ONLY public.club ADD CONSTRAINT "club_ID_Estado_fkey" FOREIGN KEY ("ID_Estado") REFERENCES public.estado("ID_Estado");
ALTER TABLE ONLY public.club ADD CONSTRAINT "club_ID_Facultad_fkey" FOREIGN KEY ("ID_Facultad") REFERENCES public.facultad("ID_Facultad");
ALTER TABLE ONLY public.club ADD CONSTRAINT "club_ID_Sede_fkey" FOREIGN KEY ("ID_Sede") REFERENCES public.sede("ID_Sede");
ALTER TABLE ONLY public.club ADD CONSTRAINT "club_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES public.usuario("ID_Usuario");
ALTER TABLE ONLY public.persona ADD CONSTRAINT fk_persona_rol FOREIGN KEY ("ID_Rol") REFERENCES public.roles("ID_Roles") ON DELETE SET NULL;
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT "inscripcion_ID_Club_fkey" FOREIGN KEY ("ID_Club") REFERENCES public.club("ID_Club");
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT "inscripcion_ID_Estado_fkey" FOREIGN KEY ("ID_Estado") REFERENCES public.estado("ID_Estado");
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT "inscripcion_ID_Persona_fkey" FOREIGN KEY ("ID_Persona") REFERENCES public.persona("ID_Persona");
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT "inscripcion_ID_Roles_fkey" FOREIGN KEY ("ID_Roles") REFERENCES public.roles("ID_Roles");
ALTER TABLE ONLY public.inscripcion ADD CONSTRAINT "inscripcion_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES public.usuario("ID_Usuario");
ALTER TABLE ONLY public.persona ADD CONSTRAINT "persona_ID_Estado_fkey" FOREIGN KEY ("ID_Estado") REFERENCES public.estado("ID_Estado");
ALTER TABLE ONLY public.persona ADD CONSTRAINT "persona_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES public.usuario("ID_Usuario");
