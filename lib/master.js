/*

 ----------------------------------------------------------------------------
 | ewd-feder8: ewd-xpress based module for federated HTTP/REST service      |
 |                                                                          |
 | Copyright (c) 2016 M/Gateway Developments Ltd,                           |
 | Reigate, Surrey UK.                                                      |
 | All rights reserved.                                                     |
 |                                                                          |
 | http://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                               |
 |                                                                          |
 |                                                                          |
 | Licensed under the Apache License, Version 2.0 (the "License");          |
 | you may not use this file except in compliance with the License.         |
 | You may obtain a copy of the License at                                  |
 |                                                                          |
 |     http://www.apache.org/licenses/LICENSE-2.0                           |
 |                                                                          |
 | Unless required by applicable law or agreed to in writing, software      |
 | distributed under the License is distributed on an "AS IS" BASIS,        |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. |
 | See the License for the specific language governing permissions and      |
 |  limitations under the License.                                          |
 ----------------------------------------------------------------------------

*/

var ewdXpress = require('ewd-xpress').master;

module.exports = {
  start: function(config, feder8) {
    var xp = ewdXpress.intercept();
    var params = {
      route: ['/:destination/*', '/:destination'],
      application: 'ewd-feder8/lib/worker',
      expressType: 'ewd-feder8'
    };
    xp.app.use('/', xp.qx.router(params));
    xp.q.on('started', function() {
      if (!xp.q.userDefined) xp.q.userDefined = {};
      xp.q.userDefined['ewd-feder8'] = feder8;
    });

    ewdXpress.start(config);
  }
};



