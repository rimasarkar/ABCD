var pm2 = require('pm2');

pm2.connect(function(err) {
   var env = (process.env.NODE_ENV ? process.env.NODE_ENV : 'development');
   var name = "titan_common_" + env;
   console.log(env);

   pm2.list(function(err, process_list) {
      var running = false;
      process_list.every(function (v, i) {
         console.log("Currently Running: ", v.name);
         if (v.name === name) {
            running = true;
            return false;
         }
      });

      if (running) {
         pm2.restart(name, function (err, proc) {
            if (err) {
               throw new Error(err);
            }

            console.log('reloaded');
            pm2.disconnect(function() { process.exit(0) });
         });
      }
      else {
         pm2.start(__dirname + "/src/app.js",
            {
               name : name,
               instance : 1,
               //error_file : "/var/log/node-app/node-app.stderr.log",
               //out_file : "log/node-app.stdout.log",
               pid_file : env+".pid",
               exec_mode : "fork",
               env: { NODE_ENV: env }
            }, function(err, proc) {
            if (err) {
               pm2.restart(name, function (err, proc) {
                  if (err) {
                     throw new Error(err);
                  }

                  console.log('restarted');
                  pm2.disconnect(function() { process.exit(0) });
               });
            }

            console.log('started');
            pm2.disconnect(function() { process.exit(0) });
         });
      }
   });
})
