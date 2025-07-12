# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# aminul01-github.io

## Security Headers

If you self-host this site or use a custom server (not GitHub Pages), it is strongly recommended to set the following HTTP security headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://aminul01-g.github.io https://www.google-analytics.com https://www.googletagmanager.com https://randomuser.me; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

If you use GitHub Pages, a fallback `<meta http-equiv="Content-Security-Policy">` is included in `public/index.html`, but HTTP headers are always preferred for maximum protection.

## Error Monitoring (Sentry)

This project supports error and performance monitoring with [Sentry](https://sentry.io/).

To enable Sentry:
1. Create a Sentry account and project at https://sentry.io/.
2. Add your Sentry DSN to a `.env` file:
   ```
   REACT_APP_SENTRY_DSN=your_sentry_dsn_here
   ```
3. The app will only send errors if the DSN is set.

Sentry is initialized in `src/index.tsx` and will capture unhandled errors and performance issues in production.
