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

--
-- Name: getstandingsperopponent(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION getstandingsperopponent(text) RETURNS TABLE(player text, opponent text, games_played bigint, home_wins bigint, away_wins bigint, home_losses bigint, away_losses bigint, total_wins bigint, total_losses bigint, win_percentage numeric, goals_for bigint, goals_against bigint)
    LANGUAGE sql
    AS $_$

SELECT CASE
			WHEN all_wins.player IS NOT NULL THEN all_wins.player
			ELSE all_losses.player
		END AS player,
		CASE
			WHEN all_wins.opponent IS NOT NULL THEN all_wins.opponent
			ELSE all_losses.opponent
		END AS opponent,
		COALESCE(all_wins.total_wins, 0) + COALESCE(all_losses.total_losses, 0) AS games_played,
		COALESCE(all_wins.home_wins, 0) AS home_wins,
		COALESCE(all_wins.away_wins, 0) AS away_wins,
		COALESCE(all_losses.home_losses, 0) AS home_losses,
		COALESCE(all_losses.away_losses, 0) AS away_losses,
		COALESCE(all_wins.total_wins, 0) AS total_wins,
		COALESCE(all_losses.total_losses, 0) AS total_losses,
		round(COALESCE(all_wins.total_wins, 0::bigint)::numeric * 1.0 / (COALESCE(all_wins.total_wins, 0::bigint) + COALESCE(all_losses.total_losses, 0::bigint))::numeric, 2) AS win_percentage,
		COALESCE(all_wins.goals_for, 0) + COALESCE(all_losses.goals_for, 0) AS goals_for,
		COALESCE(all_wins.goals_against, 0) + COALESCE(all_losses.goals_against, 0) AS goals_against
FROM
	(SELECT CASE 
				WHEN home_wins.player IS NOT NULL THEN home_wins.player
				ELSE away_wins.player
			END AS player,
	       CASE
	       		WHEN home_wins.opponent IS NOT NULL THEN home_wins.opponent
	       		ELSE away_wins.opponent
	       	END AS opponent,
			home_wins.wins AS home_wins,
			away_wins.wins AS away_wins,
			COALESCE(home_wins.wins, 0) + COALESCE(away_wins.wins, 0) AS total_wins,
			COALESCE(home_wins.goals_for,0) + COALESCE(away_wins.goals_for, 0) AS goals_for,
			COALESCE(home_wins.goals_against,0) + COALESCE(away_wins.goals_against,0) AS goals_against
			
	FROM
		(SELECT mrv.home_player AS player
		, mrv.away_player AS opponent
		, count(mrv.winner) AS wins
		, sum(mrv.home_score) AS goals_for
		, sum(mrv.away_score) AS goals_against
		FROM match_results_view mrv
		GROUP BY mrv.home_player, mrv.away_player, mrv.winner
		HAVING mrv.home_player = $1
		   AND mrv.home_player = mrv.winner) home_wins
		FULL JOIN
		(SELECT mrv.away_player AS player
		, mrv.home_player AS opponent
		, count(mrv.winner) AS wins
		, sum(mrv.away_score) AS goals_for
		, sum(mrv.home_score) AS goals_against
		FROM match_results_view mrv
		GROUP BY mrv.home_player, mrv.away_player, mrv.winner
		HAVING mrv.away_player = $1
		   AND mrv.away_player = mrv.winner) away_wins ON home_wins.opponent = away_wins.opponent) all_wins
   
FULL JOIN

(SELECT CASE
			WHEN home_losses.player IS NOT NULL THEN home_losses.player
			ELSE away_losses.player
		END AS player,
       CASE
       		WHEN home_losses.opponent IS NOT NULL THEN home_losses.opponent
       		ELSE away_losses.opponent
       	END AS opponent,
		home_losses.losses AS home_losses,
		away_losses.losses AS away_losses,
		COALESCE(home_losses.losses,0) + COALESCE(away_losses.losses, 0) AS total_losses,
		COALESCE(home_losses.goals_for,0) + COALESCE(away_losses.goals_for, 0) AS goals_for,
		COALESCE(home_losses.goals_against,0) + COALESCE(away_losses.goals_against,0) AS goals_against
FROM
(SELECT mrv.home_player AS player
, mrv.away_player AS opponent
, count(mrv.loser) AS losses
		, sum(mrv.home_score) AS goals_for
		, sum(mrv.away_score) AS goals_against
FROM match_results_view mrv
GROUP BY mrv.home_player, mrv.away_player, mrv.loser
HAVING mrv.home_player = $1
   AND mrv.home_player = mrv.loser) home_losses
FULL JOIN
(SELECT mrv.away_player AS player
, mrv.home_player AS opponent
, count(mrv.loser) AS losses
		, sum(mrv.away_score) AS goals_for
		, sum(mrv.home_score) AS goals_against
FROM match_results_view mrv
GROUP BY mrv.home_player, mrv.away_player, mrv.loser
HAVING mrv.away_player = $1
   AND mrv.away_player = mrv.loser) away_losses ON home_losses.opponent = away_losses.opponent) all_losses 
   
ON all_wins.opponent = all_losses.opponent
ORDER BY win_percentage DESC, total_wins DESC, total_losses DESC


    $_$;


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
   FROM match_results
  ORDER BY match_results.played_on DESC, match_results.id DESC;


--
-- Name: goal_summary_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW goal_summary_view AS
 SELECT COALESCE(home_summary.player, away_summary.player) AS player,
    COALESCE(home_summary.home_gf, (0)::bigint) AS home_goals_for,
    COALESCE(home_summary.home_ga, (0)::bigint) AS home_goals_against,
    (COALESCE(home_summary.home_gf, (0)::bigint) - COALESCE(home_summary.home_ga, (0)::bigint)) AS home_diff,
    COALESCE(away_summary.away_gf, (0)::bigint) AS away_goals_for,
    COALESCE(away_summary.away_ga, (0)::bigint) AS away_goals_against,
    (COALESCE(away_summary.away_gf, (0)::bigint) - COALESCE(away_summary.away_ga, (0)::bigint)) AS away_diff,
    (COALESCE(home_summary.home_gf, (0)::bigint) + COALESCE(away_summary.away_gf, (0)::bigint)) AS total_goals_for,
    (COALESCE(home_summary.home_ga, (0)::bigint) + COALESCE(away_summary.away_ga, (0)::bigint)) AS total_goals_against,
    ((COALESCE(home_summary.home_gf, (0)::bigint) + COALESCE(away_summary.away_gf, (0)::bigint)) - (COALESCE(home_summary.home_ga, (0)::bigint) + COALESCE(away_summary.away_ga, (0)::bigint))) AS total_diff
   FROM (( SELECT match_results_view.home_player AS player,
            sum(match_results_view.home_score) AS home_gf,
            sum(match_results_view.away_score) AS home_ga
           FROM match_results_view
          GROUP BY match_results_view.home_player) home_summary
     FULL JOIN ( SELECT match_results_view.away_player AS player,
            sum(match_results_view.away_score) AS away_gf,
            sum(match_results_view.home_score) AS away_ga
           FROM match_results_view
          GROUP BY match_results_view.away_player) away_summary ON ((home_summary.player = away_summary.player)));


--
-- Name: standings_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW standings_view AS
 SELECT
        CASE
            WHEN (win_summary.winner IS NOT NULL) THEN win_summary.winner
            ELSE loss_summary.loser
        END AS player,
    (COALESCE(win_summary.wins, (0)::bigint) + COALESCE(loss_summary.losses, (0)::bigint)) AS games_played,
    COALESCE(win_summary.wins, (0)::bigint) AS wins,
    COALESCE(win_summary.ot_wins, (0)::bigint) AS ot_wins,
    COALESCE(loss_summary.losses, (0)::bigint) AS losses,
    COALESCE(loss_summary.ot_losses, (0)::bigint) AS ot_losses,
    round((((COALESCE(win_summary.wins, (0)::bigint))::numeric * 1.0) / ((COALESCE(win_summary.wins, (0)::bigint) + COALESCE(loss_summary.losses, (0)::bigint)))::numeric), 2) AS win_percentage
   FROM (( SELECT match_results_view.winner,
            count(*) AS wins,
            sum(
                CASE match_results_view.overtime
                    WHEN true THEN 1
                    ELSE 0
                END) AS ot_wins
           FROM match_results_view
          GROUP BY match_results_view.winner) win_summary
     FULL JOIN ( SELECT match_results_view.loser,
            count(*) AS losses,
            sum(
                CASE match_results_view.overtime
                    WHEN true THEN 1
                    ELSE 0
                END) AS ot_losses
           FROM match_results_view
          GROUP BY match_results_view.loser) loss_summary ON ((win_summary.winner = loss_summary.loser)))
  ORDER BY (round((((COALESCE(win_summary.wins, (0)::bigint))::numeric * 1.0) / ((COALESCE(win_summary.wins, (0)::bigint) + COALESCE(loss_summary.losses, (0)::bigint)))::numeric), 2)) DESC, COALESCE(win_summary.wins, (0)::bigint) DESC, COALESCE(loss_summary.losses, (0)::bigint);


--
-- Name: detailed_standings_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW detailed_standings_view AS
 SELECT standings_view.player,
    standings_view.games_played,
    standings_view.wins,
    standings_view.ot_wins,
    standings_view.losses,
    standings_view.ot_losses,
    standings_view.win_percentage,
    goal_summary_view.total_goals_for,
    goal_summary_view.total_goals_against,
    goal_summary_view.total_diff AS total_goals_diff,
    goal_summary_view.home_goals_for,
    goal_summary_view.home_goals_against,
    goal_summary_view.home_diff AS home_goals_diff,
    goal_summary_view.away_goals_for,
    goal_summary_view.away_goals_against,
    goal_summary_view.away_diff AS away_goals_diff
   FROM (standings_view standings_view
     JOIN goal_summary_view ON ((standings_view.player = goal_summary_view.player)))
  ORDER BY standings_view.win_percentage DESC, standings_view.wins DESC, standings_view.losses, goal_summary_view.total_diff DESC;


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
-- Name: players; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE players (
    name text NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


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
-- Name: players_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (name);


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

