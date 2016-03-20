# table-hockey-tracker

This app will track scores and stats for games of table hockey.

## Get up and running locally

Clone the repo, then install dependencies:

```shell
npm install
```

You'll need access to a PostgreSQL instance with an empty database. Then
execute the `create_table_hockey_db.sql` script against it to set things
up. You can then set the DATABASE_URL environment variable to point to it:

```shell
$ export DATABASE_URL=postgres:///$(whoami)
```

Finally, kick things off:

```shell
npm run startLocal
```

You should then be able to access the site at `http://localhost:3099`

## Tech Tour

##### `koa`
- Web server / REST api framework

##### `react`
- UI component library

##### `babel \ browserify \ babelify`
- ES2015 and React transformations

##### `node-sass \ frau-sass-importer`
- SASS compiler and importer

##### `node-postgres (pg)`
- PostreSQL client for node

##### `q`
- Promise library

##### `superagent`
- AJAX request library

##### `vui-*`
- Valence UI styles and behaviours

##### `moment`
- Date parsing and formatting

##### `mustache`
- HTML template for initial render

##### `mkdirp \ rimraf`
- File system utils
