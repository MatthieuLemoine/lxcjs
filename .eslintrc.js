module.exports = {
  extends: [
      'airbnb'
  ],
  rules: {
      'no-multi-spaces'  : 0,
      'key-spacing'      : [1,{
          'beforeColon' : true,
          'afterColon'  : true,
          'mode'        : 'minimum'
      }],
      'no-use-before-define' : 0,
      'no-param-reassign' : 0,
      'strict' : 0
  },
  env : {
    node : true
  }
};
