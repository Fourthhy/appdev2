// Using Node.js `require()`
const mongoose = require('mongoose');

// Using ES6 imports
import mongoose from 'mongoose';

import { createRequire } from 'https://deno.land/std@0.177.0/node/module.ts';
const require = createRequire(import.meta.url);

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));