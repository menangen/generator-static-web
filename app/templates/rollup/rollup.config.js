<% if (javascript === 'vue' || javascript === 'preact') { %>const nodeResolve = require("rollup-plugin-node-resolve");
<% if (javascript === 'vue') { %>const vue = require("rollup-plugin-vue");
const replace = require('rollup-plugin-replace');<% } %>
<% if (javascript === 'preact') { %>const babel = require("rollup-plugin-babel");<% }} %>
export default {
    entry: 'src/javascript/main.js',
    format: 'umd',
    useStrict: false,
    moduleName: '<%= projectName %>',
    sourceMap: true,
    dest: 'dist/js/bundle.js'<% if (javascript === 'vue' || javascript === 'preact') { %>,
    plugins: [<% if (javascript === 'vue') { %>
        vue({compileTemplate: true}),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')// or "production"
        }),<% } %><% if (javascript === 'preact') { %>
        babel({
            exclude: 'node_modules/**',
            plugins: [
                ["transform-react-jsx", { "pragma": "h" }]// default pragma is preact.h
            ]}),<% } %>
        nodeResolve({ browser: true, jsnext: true, main: true })
    ]<% } %>
}