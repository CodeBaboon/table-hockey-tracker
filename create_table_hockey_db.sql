--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: match_results; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE match_results (
    id integer NOT NULL,
    home_player text NOT NULL,
    home_score smallint DEFAULT '0'::smallint NOT NULL,
    away_player text NOT NULL,
    away_score smallint DEFAULT '0'::smallint NOT NULL,
    overtime boolean DEFAULT false NOT NULL,
    played_on date DEFAULT now() NOT NULL
);


--
-- Name: match_results_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE match_results_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: match_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE match_results_id_seq OWNED BY match_results.id;


--
-- Name: match_results_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW match_results_view AS
 SELECT match_results.id,
    match_results.home_player,
    match_results.home_score,
    match_results.away_player,
    match_results.away_score,
    match_results.overtime,
    match_results.played_on,
        CASE
            WHEN (match_results.home_score > match_results.away_score) THEN match_results.home_player
            ELSE match_results.away_player
        END AS winner,
        CASE
            WHEN (match_results.home_score < match_results.away_score) THEN match_results.home_player
            ELSE match_results.away_player
        END AS loser
   FROM match_results;


--
-- Name: standings_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW standings_view AS
 SELECT
        CASE
            WHEN (win_summary.winner IS NOT NULL) THEN win_summary.winner
            ELSE loss_summary.loser
        END AS player,
    COALESCE(win_summary.wins, (0)::bigint) AS wins,
    COALESCE(loss_summary.losses, (0)::bigint) AS losses
   FROM (( SELECT match_results_view.winner,
            count(*) AS wins
           FROM match_results_view
          GROUP BY match_results_view.winner) win_summary
     FULL JOIN ( SELECT match_results_view.loser,
            count(*) AS losses
           FROM match_results_view
          GROUP BY match_results_view.loser) loss_summary ON ((win_summary.winner = loss_summary.loser)));


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY match_results ALTER COLUMN id SET DEFAULT nextval('match_results_id_seq'::regclass);


--
-- Name: match_results_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY match_results
    ADD CONSTRAINT match_results_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

