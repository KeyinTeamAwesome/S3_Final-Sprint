--PETER'S CODE.

DROP TABLE IF EXISTS public.award;

CREATE TABLE IF NOT EXISTS public.award
(
    award_id serial NOT NULL,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    last_update timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT award_pkey PRIMARY KEY (award_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.award
    OWNER to postgres;