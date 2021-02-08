const explodeSchemaId = require("./frontend/.instantcode/plugins/explodeSchemaId.plugin");
const examplePlugin = require("./backend/.instantcode/plugins/example.plugin");

const main = async ()=>{

  let config = {
    "data" : require('./instantcode.schema.json'),
    "fileTemplates" : [
      {
        "src" : "./frontend/.instantcode/files/page/page.svelte",
        "dest" : "./frontend/src/app/pages/[id]/[id].page.svelte",
        "key" : "schema"
      },
      {
        "src" : "./frontend/.instantcode/files/page/datatable.partial.svelte",
        "dest" : "./frontend/src/app/pages/[id]/datatable.partial.svelte",
        "key" : "schema"
      },
      {
        "src" : "./frontend/.instantcode/files/entity.service.js",
        "dest" : "./frontend/src/app/services/client/[id].service.js",
        "key" : "schema"
      },
      {
        "src" : "./frontend/.instantcode/files/client.index.js",
        "dest" : "./frontend/src/app/services/client/index.js"
      },
      {
        "src" : "./frontend/.instantcode/files/pages.index.js",
        "dest" : "./frontend/src/app/pages/index.js"
      },
      {
        "src" : "./frontend/.instantcode/files/routes.index.js",
        "dest" : "./frontend/src/app/routes/index.js"
      },
      {
        "src" : "./frontend/.instantcode/files/components/Aside.svelte",
        "dest" : "./frontend/src/app/components/molecules/Aside.svelte"
      },
      {
        "src" : "./frontend/.instantcode/files/api.js",
        "dest" : "./frontend/src/app/services/client/api.js"
      },
      {
        "src" : "./backend/.instantcode/files/service.js",
        "dest" : "./backend/services/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./backend/.instantcode/files/route.js",
        "dest" : "./backend/routes/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./backend/.instantcode/files/app.js",
        "dest" : "./backend/app.js"
      },
      {
        "src" : "./backend/.instantcode/files/schema.prisma",
        "dest" : "./prisma/schema.prisma"
      },
      {
        "src" : "./backend/.instantcode/files/auth.js",
        "dest" : "./backend/routes/auth.js"
      }
    ]
  }

  
  for(schema in config.data.schema){
    if(config.data.schema[schema].id == 'user'){
      config.data.schema[schema].fields.push({
        id : 'oAuthId',
        type : 'String',
        options : {
          optional : true
        }
      })
      config.data.schema[schema].fields.push({
        id : 'oAuthData',
        type : 'Json',
        options : {
          optional : true
        }
      })
      config.data.schema[schema].isUser = true
    }
  }
  

  config = await explodeSchemaId(config)
  
  
  config = await examplePlugin(config)



  return config


}

module.exports = main()
