
module.exports=function(grunt){
	grunt.initConfig({
		requirejs: {
		  	compile: {
			    options:
			    {
			      baseUrl: "public/App",
			      mainConfigFile: "public/require-main.js",
						paths:{
							"jquery":"empty:",
							"angular":"empty:",
							"angularRoute":"empty:",
							"less":"empty:",
							"moment":"empty:",
							"primus":"empty:",
							"angularPrimus":"empty:",
							"angularAnimate":"empty:",
							"angularMaterial":"empty:",
							"angularAria":"empty:",

							"ngFx":"empty:",
							"tweenMax":"empty:",
							"flowStand":"empty:",
							"ngFlow":"empty:",
							"perfectScroll":"empty:",
							"angularMessages":"empty:",
							"visor":"empty:"
						},
			      name: "App", // assumes a production build using almond
			      out: "public/App.js",
				  	done: function(done, output) {
				        var duplicates = require('rjs-build-analysis').duplicates(output);
				        console.log("in rjs-build-analysis");;
				        if (Object.keys(duplicates).length > 0) {
				          grunt.log.subhead('Duplicates found in requirejs build:');
				          for (var key in duplicates) {
				            grunt.log.error(duplicates[key] + ": " + key);
				          }
				          return done(new Error('r.js built duplicate modules, please check the excludes option.'));
				        } else {
				          grunt.log.success("No duplicates found!");
				        }

				        done();
	      			}
			    }
  			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'requirejs',

	]);
};
