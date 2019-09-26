# MUSICROOM

## Requirements

- node = 11.4.0
- xcode >= 9.2

if you dont have npm/node, see below:

- install node through nvm:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

- add these lines to your config

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

source your config, then install node 11.4.0

```
nvm install 11.4.0
```

## Quick Start

1. Clone the project: `git clone https://github.com/alice42/MusicRoom.git && cd MusicRoom`
2. Create `.env` at root folder if not exists ( see env section )
3. If you use the included .env, reset the database thanks to the link below
4. Run: `npm run setup`
5. Run: `npm run run-api`
6. Open `app/ios/app.xcodeproj` with Xcode
7. Click on `Build & Run` (play) button in Xcode

### Env section

```
API_URL=
FIREBASE_API_KEY=
FIREBASE_AUTHDOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
```

to fill firebase variables, create a project [here](https://console.firebase.google.com) 
to avoid long setup time, a .env is already included and filled

https://console.firebase.google.com/project/musicroom-c656a/database

#### Important

if you change the `.env` file don't forget to run `npm run setup` and rebuild the project in Xcode

# TODO LIST

## API

- [x] On social login, attach token if account exists
- [x] Move firebase token/password into .env
- [x] Fix mail 500
- [x] On playlist operation, verify sockets
- [ ] ~~Do real patch ( { key: value } )~~
- [ ] Add friends in user profil
- [x] update wording in service section
- [x] add no event/playlist if empty
- [ ] dezoom on map crash the app
- [ ] its hard to drag the position
- [ ] console.log to remove
- [ ] mtv add right to add/remove tracks only if canEdit
- [ ] think to bonus arguments
- [ ] source player when new/removed tracks