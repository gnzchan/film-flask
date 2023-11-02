![Logo](https://raw.githubusercontent.com/chan-gonzales/film-flask/d72955c89c41f567dfa18d5b7f56e8d743d860bd/public/images/ff-logo.svg)

# Film Flask

This web application, built with Next.js and Supabase, allows users to stream and manage their movie watchlist seamlessly. With options to categorize movies as:

- Watch Later
- Currently Watching
- Finished Watching

Users can keep track of their entertainment journey. To access these features and save lists, users need to sign in. Additionally, the app enables users to leave reviews and attach images to their movie entries, enhancing the movie-tracking experience. Powered by TMDB API, start organizing your movies today with this user-friendly, responsive web app.

## Features

- Stream films anytime
- See Popular films added by other users
- Email and Google Authentication
- Cross platform / Responsive Design
- Light and Dark mode themes

## Demo

https://film-flask.vercel.app/

![](https://s6.gifyu.com/images/S6nAu.gif)

## Tech Stack

Made using Next.js

**Client:** React, Zustand, TailwindCSS

**Server:** Supabase

<a href="https://www.typescriptlang.org/" target="blank">
<img align="center" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" height="40" width="40" />
</a>
<a href="https://reactjs.org/" target="blank">
<img align="center" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" height="40" width="40" />
</a>
<a href="https://www.w3schools.com/css/" target="blank">
<img align="center" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="Css3" height="40" width="40" />
</a>
<a href="https://www.w3.org/html/" target="blank">
<img align="center" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="Html5" height="40" width="40" />
</a>
<a href="https://tailwindcss.com/" target="blank">
<img align="center" src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="TailWind" height="40" width="40" />
</a>
<a href="https://supabase.com/" target="blank">
<img align="center" src="https://raw.githubusercontent.com/patrickpiccini/devicons/687ea87f66801c164da6793be2de9e95e4e20ca8/icons/light/Supabase.svg" alt="Supabase" height="40" width="40" />
</a>
<a href="https://git-scm.com/" target="blank">
<img align="center" src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="Git" height="40" width="40" />
</a>

## Post creation comments

I've used OMDB API as source of data for this app. 2 days after deployment, I just discovered TMDB API which provides more valuable movie details than OMDB API. Had I known TMDB API prior development, it would have been nice to use both APIs for this project.

Update: I have now migrated the app from using OMDB API to TMDB API. The effort of carefully structuring the application have made migration easier for me.
