import dotenv from 'dotenv';
import {resolve} from 'path';

import { Server } from './configuration/Server';

dotenv.config({ path: resolve() + '/.env'});

new Server().configureServer().catch(error => {
    console.error(error);
})
