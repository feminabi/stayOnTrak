# Catasys OnTrak - Start Here

- [Development](#development)
  - [Getting started](#getting-started)
  - [Content](#content)
  - [Styling](#styling)
  - [Server](#server)
    - [Command Summary](#command-summary)
    - [Configuration](#configuration)
      - [Mail Server](#mail-server)
  - [Security](#security)
- [Production Server](#production-server)
  - [Node](#node)
  - [Yarn](#yarn)
  - [MongoDB](#mongodb)
    - [Authentication & Authorization](#authentication-authorization)
  - [PM2](#pm2)
  - [Application Setup](#application-setup)
- [Deployment](#deployment)
- [Activation / Management](#activation-management)
  - [DNS and Proxy](#dns-and-proxy)

## Development

### Getting started

This project utilizes [Gatsby](https://www.gatsbyjs.org/), a [React](https://reactjs.org/)-based static site generator. It is assumed that the project's source will be maintained in a [git](https://git-scm.com) repository.

- Ensure that git is installed and, optionally, install a git client such as [SourceTree](https://www.sourcetreeapp.com/)
  - Open a terminal and enter `git --version` to see if git is already installed. If not, download and run an appropriate installer from [here](https://git-scm.com/downloads).
- Clone this repository to your local machine
- Ensure that [Node](https://nodejs.org/en/download/) is installed
- Install Yarn, the package manager and script runner - [Installing Yarn](https://yarnpkg.com/en/docs/install#alternatives-tab)
- `cd` to the project root and run `yarn install`
- Run `yarn run develop` from the project root. A development server will be launched at http://localhost:8000.

### Content

Pages and content are created as React components, stored in the `src/pages/` directory. These are real, full, React components, and thus may utilize any techniques used to build a standard React app. Components use [JSX](http://buildwithreact.com/tutorial/jsx) to define their markup. Any text editor may be used to modify these files, though care should be taken to avoid changing any application code, which is contained in the same file as the markup. There are also a number of custom components used throughout the site, designated by their capitalization (example: `<ChatPrompt />`). Any changes made to content will automatically reload the application when running in development mode (`yarn run develop`), so problems should be quickly apparent and easily avoided. [Visual Studio Code](https://code.visualstudio.com/) is the recommended text editor for this application.

A typical workflow for content editing is as follows:

1. Start the development server

        yarn run develop

1. Open a web browser to the URL listed: http://localhost:8000
1. Open one of the files in `src/pages/`
1. Update the markup and save the file
1. Check results in the browser

Some pages contain additional logic that may require editing non-markup code. For example, to edit the list of Care Coaches:

1. Open the file `src/components/Coaches.js` in a text editor
1. Copy (or modify) one of the existing pieces of data at the top of the file in the `coaches` array

        {
            firstName: 'Liana',
            lastName: 'Bonadio',
            credentials: 'BS, RN',
            photo: coachImageLiana,
            content: 'As a Care Coach, Liana combines her knowledge of psychology with her ...'
        }

1. To add a new image, place the image in `src/images/` and import the image with the other coach images at the top of the file

        import coachImageLiana from '../images/photo-coach-Liana-Bonadio.jpg';

1. The changes will be reflected immediately in the browser

New pages can be added by creating a new file in `src/pages/`, using an existing file as a reference. The site menu is contained in `src/components/PageHeader.js`.

Once changes are complete, commit the updated code to the repository. See below for a recommended strategy for deployment to the staging or production server.

Email templates are contained in `server/templates/` and are written using the [Pug](https://pugjs.org) template engine. Pug resembles a simplified version of HTML, and can directly include HTML markup if desired.

### Styling

- This application uses [SASS](http://sass-lang.com) to pre-process CSS styles
  - This processing happens automatically when the application is compiled, no additional steps are needed
- All global stylesheets should go into `src/stylesheets/` and be imported by `core.scss`
- Unique styles for individual components should go into their own stylesheet in `src/stylesheets/components/`
  - Alternatively, component styles may live alongside their respective components and use the suffix `.module.css`. This will instruct the bundler to treat the file as a CSS module, and thus namespace all the classes and styles contained therein. See [here](https://www.gatsbyjs.org/tutorial/part-two/#css-modules) for more information.
- Remember to import `_variables.scss` as well as any other dependency scss that a component will need to access

### Server

#### Command Summary

There are several commands available via `yarn run`, as follows:

- `develop`: Start the development server, which will auto-reload any changes
- `serve`: Start the API server, which handles the connection to the database as well as email functionality
- `build`: Compile the content into a static bundle, suitable for deployment to any web server
- `deploy`: Compile the content and serve it using the API server
- `check`: Run a security vulnerability check on all dependencies

The app uses a custom [Express](https://expressjs.com) application for serving pages and API handling. This server will treat the contents of `public/` as static and serve the compiled app accordingly. To run a local copy of the compiled stack, use `yarn run deploy`, which will build the front end app and start the Express server on port 3000 (by default). To enable the API server while developing using Gatsby's development server, run `yarn run serve` in one session, and `yarn run develop` in another. A Visual Studio Code launch configuration (_server_) is included for easier debugging purposes.

#### Configuration

Configuration is controlled through environment variables contained in a file named `.env` in the root of the project. With the exception of mail server settings (see below), all application settings should be placed in this file. [Note: The file is specific to each environment, and therefore is not, and should not be, committed to version control.] Below are the possible settings and their defaults, if any.

    # HTTP Port - the server will automatically redirect any connections on this port to HTTPS
    PORT=3001
    # HTTPS Port
    SSL_PORT=3000
    # Flag to enable debugging output from the Let's Encrypt module. Omit to disable debugging, any truthy value will enable debug output
    DEBUG_LEX=false
    # Database connection string, including username and password
    DB_CONN=mongodb://localhost:27017/catasys
    # Google Analytics account ID
    GA_ID=foo
    # Flag to show or hide the chat interface. Omit this setting to enable chat, any truthy value will disable chat
    GATSBY_DISABLE_CHAT=false

##### Mail Server

Due to a slightly more complex structure, mail configuration is stored in separate files, one for development use and one for production.

- `/server/config/mail.development.json`
- `/server/config/mail.json`

Which file is loaded depends on the value of the `NODE_ENV` environment variable. The default value is `development`.

### Security

The application uses [Let's Encrypt](https://letsencrypt.org) for automatic SSL certificate provisioning and renewal. This is an automatic system, and certificates will be renewed approximately 60 days after being provisioned. The certificate authority needs to be able to access the application server via port `80` or `443`. Certificates and other generated support files for Let's Encrypt are stored in `/var/catasys/ontrak/letsencrypt/`. Certificates will be fetched and stored the first time the application is accessed at its secure port using a valid domain name.

For code security, there is a dependency on `nsp`, the [Node Security Platform](https://nodesecurity.io) command line tool. Running `yarn run check` will check dependencies against any known security vulnerabilities.

## Production Server

The server hosting the application should meet the following requirements:

- Ubuntu 16.04 LTS
- 2GB RAM
- 30GB SSD Storage

The application utilizes a small number of servers and tools to operate. Below are instructions for installing each, with links to more detailed information.

### [Node](https://nodejs.org/en/)

Node is a JavaScript runtime for server applications. The OnTrak application is written entirely in JavaScript, and therefore requires Node in order to compile the browser-facing portion, as well as to run the web and API server. The recommended version of Node is `8.9.0 LTS`.

To install Node on Ubuntu systems, run the following commands:

- `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
- `sudo apt-get install -y nodejs`
- `sudo apt-get install -y build-essential`

Verify that Node has been successfully installed with `node --version`.

More details are available [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

### [Yarn](https://yarnpkg.com/en/)

Yarn is a dependency manager for Node applications. It is similar to, and meant to supercede, `npm`, the Node Package Manager, which is often installed with Node. Yarn provides a more secure, resilliant, and reliable solution. To install Yarn, run the following commands:

- `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
- `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
- `sudo apt-get update && sudo apt-get install yarn`

Verify that Node has been successfully installed with `yarn --version`.

More details are available [here](https://yarnpkg.com/en/docs/install#linux-tab).

### [MongoDB](https://www.mongodb.com)

MongoDB is a document database used to store records in easily accessible JSON format. Mongo is fast, scalable, secure, and works especially well with Node applications. In order to install Mongo, run the following commands:

- `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
- `echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
- `sudo apt-get update`
- `sudo apt-get install -y mongodb-org`
- `sudo service mongod start`

Verify that Mongo has started by checking the log file, `cat /var/log/mongodb/mongod.log` and looking for a line similar to the following:

    [initandlisten] waiting for connections on port 27017

Once the service has been verified, enable automatically starting on system startup:

- `sudo systemctl enable mongod`

More details are available [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

#### Authentication & Authorization

By default, MongoDB does not require authentication. In order to enable authentication, perform the following steps:

1. Connect to the database

        mongo

1. Create an administration user. This is the `root` user of the database, and is used to provision additional users, roles and privileges.

        use admin
        db.createUser({
          user: 'admin', // Choose an appropriate admin username
          pwd: 'password', // Specify a strong, secure password
          roles: [
            { role: 'userAdminAnyDatabase', db: 'admin' }
          ]
        })

1. Disconnect from the database shell

        quit()

1. Enable Role-Based Access Control by editing `/etc/mongo.conf`, uncommenting the `#security:` line, and adding `authorization: enabled`

        security:
          authorization: enabled

1. Restart the database instance

        sudo service mongod restart

1. Authenticate using the newly created administrator

        mongo -u "admin" -p "password" -authenticationDatabase "admin"

1. Create a new application user. This is the user the API application will authenticate as. The user will be created in the same database used to store application data.

        use catasys
        db.createUser({
          user: 'catasys', // The application username
          pwd: 'password', // A secure password, to be stored in the `.env` configuration file
          roles: [
            { role: 'readWrite', db: 'catasys' }
          ]
        })

1. Disconnect from the shell, and re-authenticate as the new application user

        quit()
        mongo -u "catasys" -p "password" -authenticationDatabase "catasys"

1. Ensure the configuration file has the correct value for the `DB_CONN` string

        DB_CONN=mongodb://catasys:password@localhost:27017/catasys

See [here](https://docs.mongodb.com/manual/tutorial/enable-authentication/) for additional details and [here](https://docs.mongodb.com/manual/reference/configuration-options/#security-options) for a list of all available security options.

#### General Database Usage

There are multiple ways to interact with the database. Using the console, as above, is one way. There are multiple GUI [clients](https://robomongo.org) available as well which may prove more useful. Data in MongoDB is stored as JSON documents. How these documents are used is beyond the scope of this document. Some examples of data are:

        // An answer record
        use catasys
        db.answers.find().pretty()

        {
                "_id" : ObjectId("59fa15f483127132c4071014"),
                "results" : {
                        "question" : "feelingLately",
                        "answer" : {
                                "sadHappy" : 3,
                                "illWell" : 4,
                                "stressedRelaxed" : 5,
                                "angryContent" : 4,
                                "fearfulConfident" : 6,
                                "nervousCalm" : 4
                        }
                },
                "sessionID" : "M_9ufv3ujQYQJDNwuuw8-42rZ-qRQdKD",
                "created" : ISODate("2017-11-01T18:44:04.268Z")
        }

        // A complete assessment record
        {
                "_id" : ObjectId("59f788b74a75a79914638739"),
                "result" : {
                        "questions" : {
                                "feelingLately" : {
                                        "sadHappy" : 3,
                                        "illWell" : 7,
                                        "stressedRelaxed" : 3,
                                        "angryContent" : 7,
                                        "fearfulConfident" : 2,
                                        "nervousCalm" : 7
                                },
                                "wishesFor" : [
                                        "Moments of peace or happiness",
                                        "A better connection with family or friends",
                                        "Test"
                                ],
                                "wantsChange" : [
                                        "Generally live a healthier life",
                                        "Decrease or stop drug use",
                                        "Become tobacco and nicotine free"
                                ],
                                "relyUponWhom" : [
                                        "My doctor",
                                        "One or two friends",
                                        "My spouse or significant other",
                                        "A community of friends",
                                        "Myself",
                                        "Coworkers",
                                        "Religious support",
                                        "My parents, siblings or extended family"
                                ],
                                "howMotivated" : 3
                        },
                        "contactInfo" : {
                                "fullName" : "Test",
                                "phoneNumber" : "222-555-1234",
                                "emailAddress" : "test@example.com",
                                "dateOfBirth" : "2001-05-12",
                                "bestCallTimes" : "Wednesday 3pm - 6pm",
                                "isEnrolled" : null,
                                "timezone" : {
                                        "identifier" : "America/New_York",
                                        "zone" : "EDT",
                                        "offset" : "-04:00"
                                }
                        },
                        "source" : "homepage"
                },
                "message" : {
                        "accepted" : [
                                "kdunnington@madpow.net"
                        ],
                        "rejected" : [ ],
                        "response" : "250 Accepted [STATUS=new MSGID=Wd5CA-1GKg1-KkMzWfeIt649iAhvl0-OAAAAiLqcscMLNuCY4odE6tfWCZw]",
                        "envelope" : {
                                "from" : "kdunnington@madpow.net",
                                "to" : [
                                        "kdunnington@madpow.net"
                                ]
                        },
                        "messageId" : "<0df7050d-f11c-5ec4-2a25-9976cc5162a3@madpow.net>"
                },
                "sessionID" : "iW65E1fkR8VSRSwykDX4z3j_7pwd8Gm7",
                "created" : ISODate("2017-10-30T20:16:55.489Z"),
                "url" : "https://ethereal.email/message/Wd5CA-1GKg1-KkMzWfeIt649iAhvl0-OAAAAiLqcscMLNuCY4odE6tfWCZw"
        }

The `sessionID` is a unique ID created for each user. This ID is stored in a secure cookie on the user's browser, and will expire when the browser window is closed.

### [PM2](http://pm2.keymetrics.io)

PM2 is a process manager designed for Node applications. It is used to provision, monitor and maintain the web and API server. It integrates with the OS's native process manager to ensure the application remains running, even after a crash or a system restart. In order to install PM2, run the following command:

- `sudo npm i -g pm2`

This will install PM2 globally. Configuration settings for PM2 are stored in `ecosystem.config.js`.

### Application Setup

Once the supporting services are in place, there are a few steps required to set up the application itself and prepare it for production. The following steps are a guideline - the actual directory names, users, and URLs may differ, depending on the final handoff, and administrator preference.

## Deployment

Recommended deployment to the production server is handled via git hooks. You must have a valid SSH key for the production server in order to deploy.

1. Create or edit the file `~/.ssh/config` on your local (development) system so it looks like the following:

        Host *
          PreferredAuthentications publickey
          ServerAliveInterval 120
          UseKeychain yes
          AddKeysToAgent yes
          ForwardAgent yes
          IdentitiesOnly yes

        Host catasys-prod
          HostName {PRODUCTION SERVER IP OR HOSTNAME}
          IdentityFile /Users/{YOUR_LOCAL_USER}/.ssh/{YOUR_CATASYS_PRIVATE_SSH_KEY}

    The above will set some SSH defaults and add an SSH alias for the production server that will automatically use the correct key when connecting.

1. On the production server, create a new directory where the application will live

        sudo mkdir -p /var/catasys/ontrak

1. Change to the new directory and set its owner to the user who will run the application

        cd /var/catasys/ontrak
        sudo chown {USERNAME} /var/catasys

1. Create a bare git repository in the home directory of the user who will run the application

        git init --bare ~/ontrak.git

1. Create a hook file in `~/ontrak.git/hooks/` named `post-receive` using the file `hooks/post-receive` as a guide. Set the file paths and branch name to match the desired setup.

1. On your development system, add a new origin to your local working copy of the project.

      // From within the project's working directory
      git remote add production {REMOTE_USERNAME}@catasys-prod:ontrak.git

1. Repeat the same process for a staging server, if desired.

1. Once set up, pushing changes to the `production` remote will trigger the hook, which will copy the files to the specified directory, install dependencies, check for security vulnerabilities and recompile the site.

## Activation / Management

Once the files are in place, the application must be started, and setup to remain running after a crash or system restart.

1. Start the application as a daemon in production mode using the PM2 process manager

        cd /var/catasys/ontrak
        pm2 start ecosystem.config.js --env production

1. Generate and configure the startup script

        pm2 startup
        // This will output the correct command to run in order to start the application automatically on system startup
        // Example: `sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu`

1. Save the process list. This ensures that, upon server restart, the currently running configuration will be recreated.

        pm2 save

The application is now running and will remain active unless explicitly stopped. Some useful management commands are:

- `pm2 ls`: List active processes
- `pm2 monit`: Actively monitor running processes
- `pm2 logs`: View and monitor application logs
  - Logs are stored in `/var/catasys/ontrak/logs` by default
- `pm2 stop ecosystem.config.js`: Stop the application. It will be restarted if the system restarts.
- `pm2 delete ecosystem.config.js`: Remove the application from the process list. It will be restarted if the system restarts.
- `pm2 save`: Commit the current process list to disk. This is the list used when the system starts up.

### DNS and Proxy

By default, the application listens for HTTPS connections on port 3000. This is an unprivileged port, which does not require root access and is therefore more secure. Additionally, the production (and staging) server should only accept connections from a designated list of external IP addresses. In order to allow users to access the application, a reverse proxy is required. It is recommended to use [nginx](https://www.nginx.com) as a reverse proxy, ideally on a separate host. Configuring nginx is beyond the scope of this document, but some recommended configuration options can be found [here](https://mozilla.github.io/server-side-tls/ssl-config-generator/?server=nginx-1.13.6&openssl=1.0.1e&hsts=yes&profile=modern) and [here](http://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup). This reverse proxy can additionally be placed behind a service such as [CloudFlare](https://www.cloudflare.com) for extra performance and security. CloudFlare can handle caching, CDN replication, and DDOS protection. Unfortunately, CloudFlare does not allow proxying from one port (443) to another (3000), which is why the nginx reverse proxy is required between the two.
