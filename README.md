[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FErickRuano%2Fvercel-minimal&env=JWT_KEY,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,DATABASE_URL&envDescription=API%20Keys%20needed%20for%20the%20application%20to%20run.%20%20JWT_KEY%20can%20be%20any%20string%20long%20enough%20to%20secure%20your%20tokens.&project-name=instantcode-vercel&repo-name=instantcode-vercel&demo-url=vercel-minimal.vercel.app&demo-image=https%3A%2F%2Fcamo.githubusercontent.com%2F164f62c6e7bafd6dff377e731c515986e8d8efaa676d3352a02d9cf03e3b0d93%2F68747470733a2f2f63646e2e686173686e6f64652e636f6d2f7265732f686173686e6f64652f696d6167652f75706c6f61642f76313631323637313834333937362f76454e6b4754305f592e706e67)

## Introduction

Many years ago I created a small inside tool that would help me develop CRUD (Create, Read, Update, Delete) projects in Angular and NodeJS.

While the quality of the code and the overall execution wasn't great, ( [it was actually awful](https://github.com/ErickRuano/transmute-js) 😣 ) since then, the idea has only grown bigger on my mind.

Please note that I was already trying to run this on Zeit back then
![transmute-zeit.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612255666394/iGAIXnnOV.png)

As we continue to enter  [a new no-code and low-code software development era](https://devops.com/low-code-to-become-commonplace-in-2021/)  I felt the need for us developers to be able to build solutions as fast as any non-developer would do with such tools, without sacrificing control over code, security, operations and know how. 

Although there are already many great static code generation tools out there I find most of them are still not simple enough or tend to be framework/language specific and also very opinionated, which is the opposite of what I was trying to achieve.

This is why a couple of months ago I started developing a prototype of a tool that would replace the previous one:  [@satelite/engineer](https://github.com/satelite-digital/engineer)

[Satélite Engineer](https://github.com/satelite-digital/engineer) is still considered a prototype because:

- It lacks test coverage
- It depends on packages that could easily be replaced with Node.js native APIs
- API definition needs small updates
- Coding practices overall aren't great right now. 

This has stopped me from publishing and sharing the project, but I found this Hackathon to be just the perfect opportunity to not only release it but to also create something with it.

##  The challenge 💪

I want to create a "deployable-with-vercel" application project template that uses Satélite Engineer at the build step, which will generate all the code needed for the application to run. 

Since the data input for this project would be a `.json` file included in the repo, you can push updates of this file to redeploy your updated application.

Since I got late to the [#VercelHashnode](https://hashnode.com/n/vercelhashnode) Hackathon the application templates will not be enterprise-grade (even a little messy), but a functional demonstration of what can be done with the tool.

## Enter Instantcode (AKA Satélite Engineer, AKA Transmute 🤭)

> “Any sufficiently advanced technology is indistinguishable from magic”

> — Arthur C. Clarke

### What is it?

Think Gatsby but language agnostic, much simpler since its only the code generation engine, and while it can also be used as a SSG (Static Site Generator) this is not its main focus or target use.  It is highly extendible and programmable, it can be integrated into modern CI/CD toolchains and can be connected to any data source, or many, via plugins.  

### How does it work?

Let's make this an interactive guide on how to get started with Instantcode development.

> Hey Erick, just wait a second,  this will take too long, can I just skip through the guide and go get my free app?

Sure, just follow [this link](#the-results).  Or follow through to gain free developer super powers in less than 10 minutes.

#### First you need to have these installed on your device

- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [GIT](https://git-scm.com/downloads)

#### Then you can install the CLI

Install Instantcode CLI:

```bash
npm i -g @instantcode/cli
```

#### Now you can setup your first project!

Instantcode allows you to adopt it incrementally into any existing project or to start a project from scratch, by running the following in your command line interface:

```bash
mkdir instantcode-demo
cd instantcode-demo
instantcode init
```

This command will list all the available built-in templates, but for now just choose "Initialize on current folder"

This will create an `instantcode.config.js` file that includes a minimal working configuration at the root of your project.

It will also create an`.instantcode` folder containing an example `data.json` file and a `files` subfolder.

The latter contains an example `code.js` file that implements template directives, and finally an example `example.plugin.js` to demonstrate how would you add or extend Instantcode features.

```
.
├── instantcode.config.js
├── .instantcode
│   └── data.json
│   └── files
│       └── code.js
│   └── plugins
│       └── example.plugin.js

```

Now you can run:

```
instantcode build
node src/index.js

// Hello World!
```

And thats it! you should now see a `src` folder containing an index.js file and you can proudly go add "Instantcode developer" to your bio on every social media platform.


> But Erick, what's so special about it? I could've just wrote a console.log("Hello, World!") myself 🥱

Continue exploring this guide so you'll soon know why this is so much cooler than writing your own static code.

First, let me explain **what just happened.**

### Understanding the configuration file

#### Data sources

Open `instantcode.config.js` and you'll notice that the code requires the example `data.json` file that was created on initialization:

```
// ./instantcode.config.js

{
    "data" : require("./.instantcode/data.json")
}
```
Which right now only contains the following:

```
// ./.instantcode/data.json

{
    "message" : "Hello, World!"
}
```

In short, the **configuration file** should export a configuration `Object` or a `Promise` that will return a configuration `Object`, allowing you to fetch data or configurations asynchronously.

While there aren't (almost) any rules about what goes into a configuration object, your data needs to be put into a `data` key on your configuration object.

Please note that this could be anything you can get into a NodeJS application (be it by using require to fetch some file, fs to read a folder full of markdown files or even fetching some remote endpoint).

#### Template files

Remember I just said there weren't almost any rules? Well, here is the only other exception.  To add template files that are going to be processed by Instantcode you need to specify their source and destination paths in a `fileTemplates` key on your configuration object.

```
// ./instantcode.config.js

{
"data" : require("./.instantcode/data.json"),
"fileTemplates" : [
    {
        "src" : ".instantcode/files/code.js",
        "dest" : "src/index.js"
    }
]
}
```

A file template is any file which implements a templating engine (currently  [Handlebars.js](https://handlebarsjs.com/)  is the only supported engine) such as:

```
// ./.instantcode/files/code.js

console.log("{{message}}"); // 😉 this is how we got our "Hello, World!".

```

### Now let's use it to make something cooler 🥶

This time you are going to provide an array as data input to one of our files to demonstrate how you can generate almost any code structure dynamically:

```
// ./.instantcode/data.json

{
    "title":"minimal to do list",
    "schema":[
        {
            "id":"user",
            "fields":[
                {
                    "id":"email",
                    "type":"String"
                },
                {
                    "id":"password",
                    "type":"String"
                }
            ]
        },
        {
            "id":"task",
            "fields":[
                {
                    "id":"text",
                    "type":"String"
                },
                {
                    "id":"isDone",
                    "type":"Boolean"
                }
            ]
        }
    ]
}
```

```
// ./instantcode.config.js

{
"data" : require("./.instantcode/data.json"),
    "fileTemplates" : [
        {
            "src" : ".instantcode/files/code.js",
            "dest" : "src/index.js",
            "key" : "schema"
        }
    ]
}

```

Each file will get the corresponding element as input for the template directives. 

Since all the generated files will have the exact same name and route each one will overwrite the previous, resulting in a useless mess.  But sometimes failing this bad is good for learning 😋

So at this point I would recommend taking a step back by running `instantcode cleanup` on your current working directory so we let instantcode clean up the mess for us.

Now, in order to name your files dynamically to avoid the previous situation, you can use any key `[here]` in your destination paths, as follows:

```
// ./instantcode.config.js

{
"data" : require("./.instantcode/data.json"),
"fileTemplates" : [
    {
        "src" : ".instantcode/files/code.js",
        "dest" : "src/[id]/index.js", // you can place inside the brackets any key of the input this file template will get
        "key" : "schema"
    }
]
}
```

This will output a `src/user/index.js` and a `src/todo/index.js`

> What if I need to transform the data before the files get it?

Instantcode supports functional extension through the use and writing of plugins.  Plugins are just any function that will get the current configuration `Object`, do any work with it and return it back.

```
// ./instantcode/plugins/yourAwesomePlugin.js

const displayNamePlugin = (config, key = "model")=>{
  return  config.model.map((obj)=>{
    obj.displayName = `${obj.id[0].toUpperCase()}${obj.id.substring(1)}`
    obj.slug = obj.id.split(" ").join("-")
    return obj
  })
}
```

There are no rules on how to run plugins or where to load them, so you can just do this

```
// ./instantcode.config.js
import yourAwesomePlugin from "./.instantcode/plugins/yourAwesomePlugin.js"

const config = {
"data" : require("./.instantcode/data.json"),
"fileTemplates" : [
    {
        "src" : ".instantcode/files/code.js",
        "dest" : "src/[id]/index.js", // you can place inside the brackets any key of the input this file template will get
        "key" : "schema"
    }
]
}

// Run your plugins here

// return yourAwesomePlugin(config) 
// or

config = yourAwesomePlugin(config)
// Run other plugins before returning the configuration object
// config = yourOtherAmazingPlugin(config)
return config;
```

And now you can do the following:
```
// ./instantcode/files/code.js

console.log('{{displayName}}')
```

Or even something like
```
// ./instantcode.config.js

...
"dest" : "src/[displayName]/index.js
...
```

### Creating a full stack template

#### Creating a frontend template

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612654838551/SEZXa7skQ.png)

I took one of my project templates and added Instantcode with `instantcode init` and selecting `Initialize current folder`.

Then I added some HandlebarsJS directives to five of the source files and the following `instantcode.config.js`:

```
const explodeSchemaId = require("./.instantcode/plugins/explodeSchemaId.plugin");

const main = async ()=>{

  let config = {
    "data" : require('./instantcode.schema.json'),
    "fileTemplates" : [
      {
        "src" : "./.instantcode/files/page/page.svelte",
        "dest" : "./src/app/pages/[id]/[id].page.svelte",
        "key" : "schema"
      },
      {
        "src" : "./.instantcode/files/page/datatable.partial.svelte",
        "dest" : "./src/app/pages/[id]/datatable.partial.svelte",
        "key" : "schema"
      },
      {
        "src" : "./.instantcode/files/pages.index.js",
        "dest" : "./src/app/pages/index.js"
      },
      {
        "src" : "./.instantcode/files/routes.index.js",
        "dest" : "./src/app/routes/index.js"
      },
      {
        "src" : "./.instantcode/files/components/Aside.svelte",
        "dest" : "./src/app/components/molecules/Aside.svelte"
      }
    ]
  }

  config = await explodeSchemaId(config)
  console.log(config.data.schema)
  return config

}

module.exports = main()
```

If you want to enable further customizations, you can do something like this to get a different UI for some schemas


![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612669566621/xKm3LXY-M.png)

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612669609050/zW_tx09Iq.png)

This will need some custom plugin to create some booleans for us to use in the templates as shown above.

You'll find all the files in the template repository at the end of this article.

Also since I almost ran out of time expect to find some ugly code and maybe some minor bugs 🙇‍♂️ will be updating soon.

#### Creating a basic API template

I wanted a backend template that required as little configuration as possible.  Meaning that once you described your application you shouldn't need to do anything else to start using your new API.

So I adapted the code from this awesome guide to work with prisma instead of mongo:

https://itnext.io/nextjs-oauth-with-passport-and-github-159e324f4900

And ended up with the following `instantcode.config.js`:

```
//
const examplePlugin = require("./.instantcode/plugins/example.plugin");

const main = async ()=>{

  let config = {
    "data" : require('./..instantcode.schema.json'),
    "fileTemplates" : [
      {
        "src" : "./.instantcode/files/service.js",
        "dest" : "./src/services/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./.instantcode/files/route.js",
        "dest" : "./src/routes/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./.instantcode/files/app.js",
        "dest" : "./src/app.js"
      },
      {
        "src" : "./.instantcode/files/schema.prisma",
        "dest" : "./prisma/schema.prisma"
      }
    ]
  }


  
  config = await examplePlugin(config)
  
  return config

}

module.exports = main()
```

This is how one of the template files look:

```
// ./.instantcode/files/schema.prisma

generator client {
  provider = "prisma-client-js"
}

{{#if useSQLite}}
datasource db {
  provider = "sqlite"
  url      = "file:./../tmp/instantcode.db"
}
{{else}}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
{{/if}}

{{#each schema}}
model {{id}} {
  id          String   @id @default(uuid())
  {{#each fields}}
  {{id}}        {{type}}{{#if options.optional}}?{{else}}{{/if}}  {{#if options.default}}@default({{{options.default}}}){{/if}}
  {{/each}}
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
}
{{/each}}
```

And the resulting file:

```
// ./prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./../tmp/instantcode.db"
}

model user {
  id    String   @id @default(uuid())
  email    String  
  password    String  
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}
model app {
  id    String   @id @default(uuid())
  text    String  
  isPublished    Boolean  @default("false")
  detail    String?  
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}

```

You'll also find the rest of the source code in the template repository shared at the end of this article.

#### Putting it all together

Now, I want both my backend and frontend to share the same `instantcode.schema.json` file as data input.  For this, I will place both projects in the same folder, where I will also place a shared `instantcode.schema.json`.

Also, since I want them both to be generated at build time, it would be best if the root folder has its own `instantcode.config.js` which combines the configurations from both projects:

```
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
        "src" : "./backend/.instantcode/files/service.js",
        "dest" : "./backend/src/services/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./backend/.instantcode/files/route.js",
        "dest" : "./backend/src/routes/[id].js",
        "key" : "schema"
      },
      {
        "src" : "./backend/.instantcode/files/app.js",
        "dest" : "./backend/src/app.js"
      },
      {
        "src" : "./backend/.instantcode/files/schema.prisma",
        "dest" : "./prisma/schema.prisma"
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


```

**⚠ Do not do this at home, I ran out of time for the Hackathon, we all know plugins can be organized and run better than this 👆**


### Making it all work with Vercel

#### Frontend build

#### Backend setup

#### Generating code at build time

The `package.json` includes a `postinstall` hook script to run `instantcode build`. Typically this would go in the build step. Because Vercel caches several files after the dependencies are installed, and some dependencies might be used in the build process (through a plugin or in the `instantcode.config.js`), running `instantcode build` in `postinstall` will guarantee the build works as expected.

#### Database migration

When you deploy the project, once you build and run you should get a database like this:

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612641925064/lJZ2cGl0-.png)


###  What we've learned so far?

1. How to install Instantcode
2. How to start a new project or add it to an existing one
3. How to create a configuration object
4. How to extend the functionality through plugins
5. How to create template files
6. How to clean our projects from Instantcode generated files
7. How to dynamically name our generated files
8. Creating a fullstack template
9. Making it all work with Vercel

> But Erick, how is this indistinguishable from magic? 🤔

### The results

![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1612671843976/vENkGT0_Y.png)

[Go to demo](https://vercel-minimal.vercel.app)

This is an application that was generated dynamically based on a `JSON` file that lives in this repo:

> [Fullstack monorepo](https://github.com/satelite-digital/vercel-minimal)

By simply editing my `instantcode.schema.json` file on the repo I get a redeploy of my application, which will migrate the new schema to the database and rebuild my frontend and backend accordingly.

You'll find a Deploy with Vercel button there in the Github repository but to be able to run that project successfully on Vercel you'll need a hosted PostgreSQL database and some Google and Github  credentials for oAuth integration.

### Next Steps

- Production ready release
- Micro-scaffolding: `instantcode add page` (Work in progress)
- Templates for NextJS, NuxtJS and others.
- Templates for Python, PHP and Java
- Guides, courses, official plugins, community marketplace and more digital resources
- Hosted Instantcode services

### Thanks for reading up to this point 💗

Including you, who skipped through, I hope you all find Instantcode something worth giving a try or better yet to be a key component of your development workflow.

Feel free to connect with me on  [twitter ](https://twitter.com/_erickruano) or  [linkedin ](https://www.linkedin.com/in/erick-ruano-fullstack) and let me know your thoughts on this project.
