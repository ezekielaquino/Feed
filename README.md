# Feed
A simple setup to get a simple FEED up and running in no time.
The setup, structure, and design has been considered to be as bare as possible. Having an "easy" way to post, and a nice pipeline is the objective here, where your own design and enhancements can go on top of.

Disclaimer: This README will probably have a cute little bug! Please do let me know, if you decide to try this out, if there's anything unclear or does not work as described. <3

## Prerequisites
- A Github account
- A Netlify account


## How it works
This feed relies on Netlify CMS (and your github repo) for data input and storage, and Gatsby to build the static pages. Check out my [personal feed's github repo](https://github.com/ezekielaquino/Feed-Ezekiel-Aquino) (and history) to get to know how Netlify CMS makes commits into the folders specified in config.yml

Default Stack:
- Gatsby
- Emotion for styling (there's barely any so switch it to any flavor you want)

Gatsby will output following static pages:
- Index page: All your entries
- Permalink for each of your entries

Files to take note of:

| File | What it does |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [./src/pages/index.js](https://github.com/ezekielaquino/Feed/blob/master/src/pages/index.js) | Main template. Everything is in here. Edit and extend to your heart's content! |
| [./src/components/Layout.js](https://github.com/ezekielaquino/Feed/blob/master/src/components/Layout.js) | Layout wrapper for the entire site. This is where the top bar lives. |
| [./src/components/Entry.js](https://github.com/ezekielaquino/Feed/blob/master/src/pages/index.js) | Component for a single feed entry. |
| [./src/templates/EntryTemplate.js](https://github.com/ezekielaquino/Feed/blob/master/src/templates/EntryTemplate.js) | Template for Permalink pages |
| [./static/admin/config.yml](https://github.com/ezekielaquino/Feed/blob/master/static/admin/config.yml) | Netlify CMS configuration. If you want to make changes to your scheme (the inputs for each entry) then this is the place to go. Edit to your heart's delight! |
| [./gatsby-config.js](https://github.com/ezekielaquino/Feed/blob/master/gatsby-config.js) | Here you can find `siteMetadata`. Set the site's title (displayed in header) and `socials`. Edit to your heart's enjoyment! |
|  | *Note* default settings will create and use `./_entries` as the directory where all your posts will be pushed to (.md), and `./static/images/uploads` where all your images will be uploaded to. It uses the repo itself as data storage, and will make a commit on every post/edit! Cute! |

## Getting Started
### 1️⃣ Step 1
Setup a Git repo for your feed.

### 2️⃣ Step 2
Clone this repository `git clone ` then `cd` to that directory.
Set the remote to your own repository, or you can "reset" git by doing:

```
  rm -rf .git
  git init
  git remote add origin [your git ssh url]
```

Publish your repository to Github!

### 3️⃣ Step 3
Login into your Netlify account, and create new deployment. Connect to your Github account and select the repo you just created for your feed. Press OK! It should start an initial deployment.

### 4️⃣ Step 4
Now we need to setup your netlify account to handle authentication, and so your Gatsby deployment knows where to draw data from. This assumes that your project/repo already has its own "dashboard" page (https://app.netlify.com/sites/[site-name]). 

#### 4a – Enable Identity
You must enable `Netlify Identity`. You can do this by going the the Identity tab in the project's dashboard.

![Enable netlify identity](https://i.imgur.com/ttHieq7.png)

#### 4b – Enable Git Gateway
Once enabled, click on `Settings and Usage` and under the `Identity` tab on the left pane, select services then `Enable Git Gateway`.

![Settings and usage](https://i.imgur.com/QsxkcfX.png)
![Services Tab](https://i.imgur.com/BWJgagW.png)

##### 4c – Inject required scripts
Now we need to inject some required scripts provided by Netlify via CDN. This handles authentication when you access your CMS. On the same left pane, find `Build & deploy` and click on `Post processing`. There you'll find `Snippet injection`.

![Inject scripts](https://i.imgur.com/BToIXhT.png)

We'll inject two scripts: One that goes `Before </head>`. Copy and paste the code below.
```js
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

...and one that goes `Before </body>`. Copy and paste the code below.
```js
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

#### 5️⃣ Step 5
Send yourself an invitation by again going to `Identity` tab, and click on `Invite users`. Enter a valid email and you'll soon get a confirm invitation link. Accept it!

#### 6️⃣ Step 6
Trigger a build/redeploy on Netlify! Note: your site will be empty since you dont have any posts yet!

![Trigger deploy](https://i.imgur.com/pemT1ID.png)

#### 🚀 Make your first post!
Go to `/admin` of your Netlify deployment e.g. `https://[your-url].netlify.com/admin`. You'll be prompted to login and will be taken to the CMS' dashboard. Make your first entry, and wait a second until your site redeploys.

### `✨ Ta da`
You got a feed running!

![Ezekiel's feed](https://i.imgur.com/H8qIaIt.png)


## Next steps (for you)
I hope that this serves as a nice and simple way to just get a feed up and running! Maybe it serves as a nice base for whatever you intend it to be :) Do let me know if you use it! Also, please feel free to make suggestions! Peace and love <3
