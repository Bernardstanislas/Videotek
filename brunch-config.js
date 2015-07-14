exports.config = {
  sourceMaps: false,
  paths: {
    'public': '../server/static/'
  },
  files: {
        javascripts: {
            joinTo: {
                'javascripts/app.js': /^client/,
                'javascripts/vendor.js': /^(bower_components|vendor|node_modules)/
            },
            order: {
                before: [
                    'client/vendor/react.js',
                    'client/vendor/focus.js'
                ]
            }
        },
        stylesheets: {
            joinTo: 'stylesheets/app.css',
            order: {
                before: []
            }
        },
        templates: {
            joinTo: 'javascripts/app.js'
        }
    },
    plugins: {
        uglify: {
            mangle: false,
            compress: {
                global_defs: {
                    DEBUG: false
                }
            }
        },
        cleancss: {
            keepSpecialComments: 0,
            removeEmpty: true
        },
        react: {
            transformOptions: {
                sourceMap: false
            },
            babel: true
        },
        appcache: {
            staticRoot: '/static',
            network: ['*'],
            fallback: {}
        },
        browserSync: {
            port: 8080,
            logLevel: 'debug'
        }
    }
};
