module.exports = {
  apps : [{
    name   : 'app',
    script : 'node_modules/.bin/next',
    args: 'start -p 12701',
    exec_mode: 'fork',
    cwd: '/home/wuruphco/wuruph_apps/apps/app',
    // max_memory_restart: '1G',
    cron_restart: '0 0 * * *',
    instances: 1,
    autorestart: true,
    watch: [
        './public',
        '../public_html',
    ],
  }]
}