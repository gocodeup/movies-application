/**
 * This file is the "entrypoint" into your application
 */
import 'bootstrap'
import $ from 'jquery'
import {dbChecker} from './arrayLoader.js'



$(() => {
  $('[data-toggle="popover"]').popover()
});

dbChecker;