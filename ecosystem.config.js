module.exports = {
  apps: [
    {
      name: 'catasys-ontrak',
      script: './bin/www',
      watch: ['./server'],
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      env: {
        'NODE_ENV': 'development',
        'DEBUG': 'catasys:*'
      },
      env_production: {
        'NODE_ENV': 'production'
      },
    }
  ]
}
